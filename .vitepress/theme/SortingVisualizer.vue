<template>
  <div class="visualizer-container" :class="{ 'embedded': algo }">
    <div class="visualizer-glow"></div>
    <div class="visualizer-window">
      <!-- 头部控制栏 -->
      <div class="visualizer-header">
        <div class="visualizer-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="visualizer-title">
          {{ getAlgoTitle() }} - civilization-os
        </div>
      </div>

      <!-- 主体内容 -->
      <div class="visualizer-body">
        <!-- 顶部控制条 -->
        <div class="controls-bar">
          <!-- 仅在未指定 algo 属性时显示算法选择下拉菜单 -->
          <div class="control-group" v-if="!algo">
            <label for="algo-select">选择算法：</label>
            <select id="algo-select" v-model="selectedAlgorithm" @change="resetVisualization" :disabled="isPlaying">
              <option value="bubble">冒泡排序 (Bubble Sort)</option>
              <option value="selection">选择排序 (Selection Sort)</option>
              <option value="insertion">插入排序 (Insertion Sort)</option>
              <option value="merge">归并排序 (Merge Sort)</option>
              <option value="quick">快速排序 (Quick Sort)</option>
              <option value="bucket">桶排序 (Bucket Sort)</option>
            </select>
          </div>

          <div class="control-buttons">
            <button class="btn primary" @click="togglePlay" title="播放/暂停">
              <span v-if="isPlaying">⏸ 暂停</span>
              <span v-else>▶ 播放</span>
            </button>
            <button class="btn" @click="stepBackward" :disabled="currentStep <= 0 || isPlaying" title="上一步">⏮</button>
            <button class="btn" @click="stepForward" :disabled="currentStep >= history.length - 1 || isPlaying" title="下一步">⏭</button>
            <button class="btn danger" @click="regenerateArray" :disabled="isPlaying" title="随机数组">🔄 随机</button>
          </div>
        </div>

        <div class="speed-bar">
          <label for="speed-range">演示速度：</label>
          <input id="speed-range" type="range" min="40" max="600" step="20" v-model.number="speed" />
          <span class="speed-text">{{ speed }}ms</span>
        </div>

        <!-- 图例说明 -->
        <div class="legend-bar">
          <span class="legend-item"><span class="legend-dot default"></span>未排序</span>
          <span class="legend-item"><span class="legend-dot comparison"></span>对比中</span>
          <span class="legend-item"><span class="legend-dot swap"></span>交换中</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'selection'"><span class="legend-dot current-min"></span>当前最小</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'insertion'"><span class="legend-dot key"></span>已提取项</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'insertion'"><span class="legend-dot empty"></span>空缺位</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'merge'"><span class="legend-dot left-range"></span>左半区间</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'merge'"><span class="legend-dot right-range"></span>右半区间</span>
          <span class="legend-item" v-if="selectedAlgorithm === 'quick'"><span class="legend-dot pivot"></span>基准值(Pivot)</span>
          <span class="legend-item"><span class="legend-dot sorted"></span>已就位</span>
        </div>

        <!-- 柱状图展示区 -->
        <div class="bars-container" :class="{ 'embedded-bars': algo }">
          <div 
            v-for="(item, index) in currentFrame.array" 
            :key="index"
            class="bar-wrapper"
            :style="{ width: `${100 / arraySize}%` }"
          >
            <!-- 桶排序分发后，原位置设为 0 (高度很小且半透明代表已分发) -->
            <div 
              v-if="selectedAlgorithm === 'bucket' && item === 0"
              class="bar distributed-slot-bar"
              :style="{ height: '10px' }"
            ></div>
            <div 
              v-else-if="selectedAlgorithm === 'insertion' && index === currentFrame.emptyIndex"
              class="bar empty-slot-bar"
              :style="{ height: `${currentFrame.keyValue * 2.8}px` }"
            >
              <span class="bar-value empty-value" v-if="arraySize <= 15">{{ currentFrame.keyValue }}</span>
            </div>
            <div 
              v-else
              class="bar" 
              :class="getBarClass(index)"
              :style="{ height: `${item * 2.8}px` }"
            >
              <span class="bar-value" v-if="arraySize <= 15">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- 桶排序专用的虚拟桶显示区域 -->
        <div v-if="selectedAlgorithm === 'bucket'" class="buckets-area">
          <div 
            v-for="(bucket, bIdx) in currentFrame.buckets" 
            :key="bIdx" 
            class="bucket-container"
            :class="{ 'active-bucket': currentFrame.activeBucket === bIdx }"
          >
            <div class="bucket-label">{{ getBucketLabel(bIdx) }}</div>
            <div class="bucket-elements">
              <div 
                v-for="(val, vIdx) in bucket" 
                :key="vIdx" 
                class="bucket-element-block"
                :class="getBucketElementClass(bIdx, vIdx)"
                :style="{ height: `${val * 1.5}px` }"
              >
                {{ val }}
              </div>
              <div v-if="bucket.length === 0" class="bucket-empty-text">空</div>
            </div>
          </div>
        </div>

        <!-- 当前步骤描述与进度 -->
        <div class="info-panel">
          <div class="progress-info">
            <span>步骤：{{ currentStep }} / {{ history.length - 1 }}</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: `${(currentStep / (history.length - 1 || 1)) * 100}%` }"></div>
            </div>
          </div>
          <div class="step-description">
            <span class="desc-tag">说明</span>
            <p class="desc-text">{{ currentFrame.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  algo: {
    type: String,
    default: ''
  }
})

const arraySize = 12
const speed = ref(180)
const selectedAlgorithm = ref(props.algo || 'bubble')
const initialArray = ref([])
const isPlaying = ref(false)
const currentStep = ref(0)
const history = ref([])
let timer = null

const getAlgoTitle = () => {
  switch (selectedAlgorithm.value) {
    case 'bubble': return '冒泡排序 (Bubble Sort) 演示'
    case 'selection': return '选择排序 (Selection Sort) 演示'
    case 'insertion': return '插入排序 (Insertion Sort) 演示'
    case 'merge': return '归并排序 (Merge Sort) 演示'
    case 'quick': return '快速排序 (Quick Sort) 演示'
    case 'bucket': return '桶排序 (Bucket Sort) 演示'
    default: return '排序算法演示'
  }
}

const getBucketLabel = (bIdx) => {
  if (bIdx === 0) return '桶 1 [15-39]'
  if (bIdx === 1) return '桶 2 [40-64]'
  return '桶 3 [65-90]'
}

const getBucketElementClass = (bIdx, vIdx) => {
  const frame = currentFrame.value
  if (frame.activeBucket === bIdx && frame.bucketComparison && frame.bucketComparison.includes(vIdx)) {
    return 'active'
  }
  return ''
}

const generateRandomArray = () => {
  const arr = []
  for (let i = 0; i < arraySize; i++) {
    arr.push(Math.floor(Math.random() * 70) + 15)
  }
  return arr
}

const regenerateArray = () => {
  initialArray.value = generateRandomArray()
  resetVisualization()
}

const currentFrame = computed(() => {
  if (history.value.length === 0 || currentStep.value >= history.value.length) {
    return {
      array: [...initialArray.value],
      comparison: [],
      swap: [],
      sorted: [],
      description: '点击播放开始演示算法执行流程',
      pivot: -1,
      currentMin: -1,
      keyIndex: -1,
      emptyIndex: -1,
      keyValue: 0,
      leftRange: [-1, -1],
      rightRange: [-1, -1],
      buckets: [[], [], []],
      activeBucket: -1,
      bucketComparison: []
    }
  }
  return history.value[currentStep.value]
})

const getBarClass = (index) => {
  const frame = currentFrame.value
  
  if (frame.swap && frame.swap.includes(index)) {
    return 'swap'
  }
  if (selectedAlgorithm.value === 'quick' && index === frame.pivot) {
    return 'pivot'
  }
  if (selectedAlgorithm.value === 'selection' && index === frame.currentMin) {
    return 'current-min'
  }
  if (selectedAlgorithm.value === 'insertion' && index === frame.keyIndex) {
    return 'key'
  }
  if (frame.comparison && frame.comparison.includes(index)) {
    return 'comparison'
  }
  if (selectedAlgorithm.value === 'merge') {
    if (frame.leftRange && index >= frame.leftRange[0] && index <= frame.leftRange[1]) {
      return 'left-range'
    }
    if (frame.rightRange && index >= frame.rightRange[0] && index <= frame.rightRange[1]) {
      return 'right-range'
    }
  }
  if (frame.sorted && frame.sorted.includes(index)) {
    return 'sorted'
  }
  return 'default'
}

const resetVisualization = () => {
  pause()
  currentStep.value = 0
  generateHistory()
}

const togglePlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

const play = () => {
  if (currentStep.value >= history.value.length - 1) {
    currentStep.value = 0
  }
  isPlaying.value = true
  runTimer()
}

const pause = () => {
  isPlaying.value = false
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const runTimer = () => {
  if (!isPlaying.value) return
  if (currentStep.value >= history.value.length - 1) {
    isPlaying.value = false
    return
  }
  timer = setTimeout(() => {
    currentStep.value++
    runTimer()
  }, speed.value)
}

const stepForward = () => {
  if (currentStep.value < history.value.length - 1) {
    currentStep.value++
  }
}

const stepBackward = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

watch(speed, () => {
  if (isPlaying.value) {
    pause()
    play()
  }
})

const generateHistory = () => {
  const arr = [...initialArray.value]
  const steps = []
  
  steps.push({
    array: [...arr],
    comparison: [],
    swap: [],
    sorted: [],
    description: '初始状态，准备开始排序',
    pivot: -1,
    currentMin: -1,
    keyIndex: -1,
    emptyIndex: -1,
    keyValue: 0,
    leftRange: [-1, -1],
    rightRange: [-1, -1],
    buckets: [[], [], []],
    activeBucket: -1,
    bucketComparison: []
  })

  if (selectedAlgorithm.value === 'bubble') {
    generateBubbleFrames(arr, steps)
  } else if (selectedAlgorithm.value === 'selection') {
    generateSelectionFrames(arr, steps)
  } else if (selectedAlgorithm.value === 'insertion') {
    generateInsertionFrames(arr, steps)
  } else if (selectedAlgorithm.value === 'merge') {
    generateMergeFrames(arr, steps)
  } else if (selectedAlgorithm.value === 'quick') {
    generateQuickFrames(arr, steps)
  } else if (selectedAlgorithm.value === 'bucket') {
    generateBucketFrames(arr, steps)
  }

  history.value = steps
}

// 1. 冒泡排序 (Bubble Sort)
const generateBubbleFrames = (arr, steps) => {
  const n = arr.length
  const workingArr = [...arr]
  const sortedIndices = []

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...workingArr],
        comparison: [j, j + 1],
        swap: [],
        sorted: [...sortedIndices],
        description: `比较相邻的元素 arr[${j}] (${workingArr[j]}) 和 arr[${j+1}] (${workingArr[j+1]})`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })

      if (workingArr[j] > workingArr[j + 1]) {
        const temp = workingArr[j]
        workingArr[j] = workingArr[j + 1]
        workingArr[j + 1] = temp
        swapped = true
        
        steps.push({
          array: [...workingArr],
          comparison: [],
          swap: [j, j + 1],
          sorted: [...sortedIndices],
          description: `因为 arr[${j}] > arr[${j+1}]，交换它们的位置`,
          pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
          buckets: [[], [], []], activeBucket: -1, bucketComparison: []
        })
      }
    }
    sortedIndices.unshift(n - 1 - i)
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [...sortedIndices],
      description: `第 ${i + 1} 轮结束，最大元素 ${workingArr[n - 1 - i]} 已确定位置`,
      pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    if (!swapped) break
  }

  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '冒泡排序完成，所有元素已就位！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []], activeBucket: -1, bucketComparison: []
  })
}

// 2. 选择排序 (Selection Sort)
const generateSelectionFrames = (arr, steps) => {
  const n = arr.length
  const workingArr = [...arr]
  const sortedIndices = []

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    steps.push({
      array: [...workingArr],
      comparison: [i],
      swap: [],
      sorted: [...sortedIndices],
      description: `设定初始最小元素位置为索引 ${i} (${workingArr[i]})`,
      pivot: -1,
      currentMin: minIndex,
      keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...workingArr],
        comparison: [j, minIndex],
        swap: [],
        sorted: [...sortedIndices],
        description: `扫描：比较当前元素 arr[${j}] (${workingArr[j]}) 与当前最小值 arr[${minIndex}] (${workingArr[minIndex]})`,
        pivot: -1,
        currentMin: minIndex,
        keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })

      if (workingArr[j] < workingArr[minIndex]) {
        minIndex = j
        steps.push({
          array: [...workingArr],
          comparison: [minIndex],
          swap: [],
          sorted: [...sortedIndices],
          description: `发现更小元素，更新最小值位置为索引 ${j} (${workingArr[j]})`,
          pivot: -1,
          currentMin: minIndex,
          keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
          buckets: [[], [], []], activeBucket: -1, bucketComparison: []
        })
      }
    }

    if (minIndex !== i) {
      const temp = workingArr[i]
      workingArr[i] = workingArr[minIndex]
      workingArr[minIndex] = temp
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [i, minIndex],
        sorted: [...sortedIndices],
        description: `将未排序部分的起点元素 arr[${i}] (${temp}) 与最小值 arr[${minIndex}] (${workingArr[i]}) 进行交换`,
        pivot: -1,
        currentMin: minIndex,
        keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })
    }
    sortedIndices.push(i)
  }
  
  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '选择排序完成，所有元素已就绪！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []], activeBucket: -1, bucketComparison: []
  })
}

// 3. 插入排序 (Insertion Sort)
const generateInsertionFrames = (arr, steps) => {
  const n = arr.length
  const workingArr = [...arr]
  const sortedIndices = [0]

  for (let i = 1; i < n; i++) {
    const key = workingArr[i]
    let j = i - 1
    
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [...sortedIndices],
      description: `提取未排序序列第一个元素 key = ${key}，原位置留下空缺`,
      pivot: -1,
      currentMin: -1,
      keyIndex: i,
      emptyIndex: i,
      keyValue: key,
      leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    while (j >= 0 && workingArr[j] > key) {
      steps.push({
        array: [...workingArr],
        comparison: [j],
        swap: [],
        sorted: [...sortedIndices],
        description: `比较已排序项 arr[${j}] (${workingArr[j]}) 和 key (${key})：因为较大，往右边挪动一位`,
        pivot: -1,
        currentMin: -1,
        keyIndex: -1,
        emptyIndex: j + 1,
        keyValue: key,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })

      workingArr[j + 1] = workingArr[j]
      j--
      
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [j + 1, j + 2],
        sorted: [...sortedIndices],
        description: `将元素移动完毕，空缺位前移至索引 ${j + 1}`,
        pivot: -1,
        currentMin: -1,
        keyIndex: -1,
        emptyIndex: j + 1,
        keyValue: key,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })
    }
    
    workingArr[j + 1] = key
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i)
    }
    
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [j + 1],
      sorted: Array.from({length: i + 1}, (_, idx) => idx),
      description: `将 key (${key}) 插入到最终确定的空缺位 arr[${j + 1}]`,
      pivot: -1,
      currentMin: -1,
      keyIndex: j + 1,
      emptyIndex: -1,
      keyValue: 0,
      leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })
  }

  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '插入排序完成，所有元素已就绪！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []], activeBucket: -1, bucketComparison: []
  })
}

// 4. 归并排序 (Merge Sort)
const generateMergeFrames = (arr, steps) => {
  const n = arr.length
  const workingArr = [...arr]

  const mergeSortHelper = (l, r) => {
    if (l >= r) return
    const mid = Math.floor((l + r) / 2)
    mergeSortHelper(l, mid)
    mergeSortHelper(mid + 1, r)
    merge(l, mid, r)
  }

  const merge = (l, mid, r) => {
    const leftArr = workingArr.slice(l, mid + 1)
    const rightArr = workingArr.slice(mid + 1, r + 1)
    let i = 0, j = 0, k = l

    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [],
      description: `准备归并区间：左半部分 [${l}, ${mid}] 与 右半部分 [${mid + 1}, ${r}]`,
      pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
      leftRange: [l, mid],
      rightRange: [mid + 1, r],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...workingArr],
        comparison: [l + i, mid + 1 + j],
        swap: [],
        sorted: [],
        description: `比较左侧待归并元素 ${leftArr[i]} 与右侧元素 ${rightArr[j]}`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [l + i, mid],
        rightRange: [mid + 1 + j, r],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })

      if (leftArr[i] <= rightArr[j]) {
        workingArr[k] = leftArr[i]
        i++
      } else {
        workingArr[k] = rightArr[j]
        j++
      }
      
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [k],
        sorted: [],
        description: `将较小值写入原序列的第 ${k} 位`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [l + Math.min(i, leftArr.length - 1), mid],
        rightRange: [mid + 1 + Math.min(j, rightArr.length - 1), r],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })
      k++
    }

    while (i < leftArr.length) {
      workingArr[k] = leftArr[i]
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [k],
        sorted: [],
        description: `左半部剩余元素 ${leftArr[i]} 直接写入第 ${k} 位`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [l + i, mid],
        rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })
      i++
      k++
    }

    while (j < rightArr.length) {
      workingArr[k] = rightArr[j]
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [k],
        sorted: [],
        description: `右半部剩余元素 ${rightArr[j]} 直接写入第 ${k} 位`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [-1, -1],
        rightRange: [mid + 1 + j, r],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })
      j++
      k++
    }
  }

  mergeSortHelper(0, n - 1)
  
  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '归并排序完成，所有元素已就绪！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []], activeBucket: -1, bucketComparison: []
  })
}

// 5. 快速排序 (Quick Sort)
const generateQuickFrames = (arr, steps) => {
  const n = arr.length
  const workingArr = [...arr]
  const sortedIndices = []

  const quickSortHelper = (left, right) => {
    if (left >= right) {
      if (left === right) sortedIndices.push(left)
      return
    }
    const pivotIndex = partition(left, right)
    sortedIndices.push(pivotIndex)
    quickSortHelper(left, pivotIndex - 1)
    quickSortHelper(pivotIndex + 1, right)
  }

  const partition = (left, right) => {
    const pivot = workingArr[right]
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [...sortedIndices],
      description: `选择最右侧元素 arr[${right}] (${pivot}) 作为基准值 (Pivot)`,
      pivot: right, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    let i = left - 1
    for (let j = left; j < right; j++) {
      steps.push({
        array: [...workingArr],
        comparison: [j],
        swap: [],
        sorted: [...sortedIndices],
        description: `扫描：比较当前元素 arr[${j}] (${workingArr[j]}) 和基准值 (${pivot})`,
        pivot: right, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: [[], [], []], activeBucket: -1, bucketComparison: []
      })

      if (workingArr[j] < pivot) {
        i++
        const temp = workingArr[i]
        workingArr[i] = workingArr[j]
        workingArr[j] = temp
        
        steps.push({
          array: [...workingArr],
          comparison: [],
          swap: [i, j],
          sorted: [...sortedIndices],
          description: `因为较小，将 arr[${j}] (${workingArr[i]}) 与指针后一位 arr[${i}] (${workingArr[j]}) 交换`,
          pivot: right, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
          buckets: [[], [], []], activeBucket: -1, bucketComparison: []
        })
      }
    }

    const temp = workingArr[i + 1]
    workingArr[i + 1] = workingArr[right]
    workingArr[right] = temp
    
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [i + 1, right],
      sorted: [...sortedIndices],
      description: `将基准值从 arr[${right}] 交换到最终的分区点 arr[${i + 1}]`,
      pivot: i + 1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: [[], [], []], activeBucket: -1, bucketComparison: []
    })

    return i + 1
  }

  quickSortHelper(0, n - 1)
  
  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '快速排序完成，所有元素已就绪！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0, leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []], activeBucket: -1, bucketComparison: []
  })
}

// 6. 桶排序 (Bucket Sort)
const generateBucketFrames = (arr, steps) => {
  const n = arr.length
  const bucketRanges = [
    { min: 15, max: 39, label: '桶 1 [15-39]' },
    { min: 40, max: 64, label: '桶 2 [40-64]' },
    { min: 65, max: 90, label: '桶 3 [65-90]' }
  ]
  
  const workingArr = [...arr]
  const buckets = [[], [], []]
  
  // 1. 分发阶段
  for (let j = 0; j < n; j++) {
    const val = workingArr[j]
    let bIdx = 0
    if (val >= 40 && val <= 64) bIdx = 1
    else if (val >= 65) bIdx = 2
    
    buckets[bIdx].push(val)
    workingArr[j] = 0 // 主数组对应项清空(渲染为半透明短块)
    
    steps.push({
      array: [...workingArr],
      comparison: [j],
      swap: [],
      sorted: [],
      description: `分发：将元素 ${val} 放入对应区间的 ${bucketRanges[bIdx].label}`,
      pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
      leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: buckets.map(b => [...b]),
      activeBucket: bIdx,
      bucketComparison: [buckets[bIdx].length - 1]
    })
  }
  
  // 2. 桶内排序阶段
  for (let bIdx = 0; bIdx < 3; bIdx++) {
    const bucket = buckets[bIdx]
    if (bucket.length <= 1) {
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [],
        sorted: [],
        description: `${bucketRanges[bIdx].label} 元素个数为 ${bucket.length}，无需排序`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: buckets.map(b => [...b]),
        activeBucket: bIdx,
        bucketComparison: []
      })
      continue
    }
    
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [],
      description: `准备对 ${bucketRanges[bIdx].label} 内的元素进行排序`,
      pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
      leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: buckets.map(b => [...b]),
      activeBucket: bIdx,
      bucketComparison: []
    })
    
    // 桶内插入排序
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i]
      let j = i - 1
      
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [],
        sorted: [],
        description: `桶内排序：提取待插入元素 ${key}`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: buckets.map(b => [...b]),
        activeBucket: bIdx,
        bucketComparison: [i]
      })

      while (j >= 0 && bucket[j] > key) {
        steps.push({
          array: [...workingArr],
          comparison: [],
          swap: [],
          sorted: [],
          description: `比较桶内元素 ${bucket[j]} 与 ${key}，因为较大而向后挪动`,
          pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
          leftRange: [-1, -1], rightRange: [-1, -1],
          buckets: buckets.map(b => [...b]),
          activeBucket: bIdx,
          bucketComparison: [j, j + 1]
        })

        bucket[j + 1] = bucket[j]
        j--
      }
      bucket[j + 1] = key
      
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [],
        sorted: [],
        description: `将 ${key} 插入到当前桶的正确位置`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: buckets.map(b => [...b]),
        activeBucket: bIdx,
        bucketComparison: [j + 1]
      })
    }
    
    steps.push({
      array: [...workingArr],
      comparison: [],
      swap: [],
      sorted: [],
      description: `${bucketRanges[bIdx].label} 内部排序完成：[${bucket.join(', ')}]`,
      pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
      leftRange: [-1, -1], rightRange: [-1, -1],
      buckets: buckets.map(b => [...b]),
      activeBucket: bIdx,
      bucketComparison: []
    })
  }
  
  // 3. 收集回收阶段
  let mainIdx = 0
  const sortedIndices = []
  for (let bIdx = 0; bIdx < 3; bIdx++) {
    const bucket = buckets[bIdx]
    while (bucket.length > 0) {
      const val = bucket.shift()
      workingArr[mainIdx] = val
      sortedIndices.push(mainIdx)
      
      steps.push({
        array: [...workingArr],
        comparison: [],
        swap: [mainIdx],
        sorted: [...sortedIndices],
        description: `收回：从 ${bucketRanges[bIdx].label} 取出元素 ${val} 写回主数组第 ${mainIdx + 1} 位`,
        pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
        leftRange: [-1, -1], rightRange: [-1, -1],
        buckets: buckets.map(b => [...b]),
        activeBucket: bIdx,
        bucketComparison: []
      })
      mainIdx++
    }
  }
  
  steps.push({
    array: [...workingArr],
    comparison: [],
    swap: [],
    sorted: Array.from({length: n}, (_, i) => i),
    description: '桶排序完成，所有元素已成功回收！',
    pivot: -1, currentMin: -1, keyIndex: -1, emptyIndex: -1, keyValue: 0,
    leftRange: [-1, -1], rightRange: [-1, -1],
    buckets: [[], [], []],
    activeBucket: -1,
    bucketComparison: []
  })
}

onMounted(() => {
  if (props.algo) {
    selectedAlgorithm.value = props.algo
  }
  regenerateArray()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.visualizer-container {
  position: relative;
  max-width: 800px;
  margin: 32px auto;
  padding: 10px;
  z-index: 1;
}

/* 嵌入式布局微调 */
.visualizer-container.embedded {
  margin: 20px auto;
  max-width: 720px;
}

.visualizer-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(6, 182, 212, 0.05) 50%,
    transparent 100%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.dark .visualizer-glow {
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(6, 182, 212, 0.08) 50%,
    transparent 100%
  );
}

.visualizer-window {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.dark .visualizer-window {
  background: rgba(24, 24, 28, 0.7);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.visualizer-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid var(--vp-c-divider);
  position: relative;
}

.dark .visualizer-header {
  background: rgba(255, 255, 255, 0.02);
}

.visualizer-dots {
  position: absolute;
  left: 16px;
  display: flex;
  gap: 8px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.visualizer-title {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 12px;
  color: var(--vp-c-text-3);
  user-select: none;
}

.visualizer-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 控制栏 */
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.control-group label {
  color: var(--vp-c-text-2);
}

select {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
select:focus {
  border-color: var(--vp-c-brand-1);
}

.control-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  user-select: none;
}
.btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-3);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: transparent;
}
.btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn.danger {
  border-color: transparent;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.btn.danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.2);
}

.speed-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.speed-bar input[type="range"] {
  flex: 1;
  max-width: 200px;
  accent-color: var(--vp-c-brand-1);
}
.speed-text {
  min-width: 45px;
  font-family: var(--vp-font-family-mono, monospace);
}

/* 图例 */
.legend-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  display: inline-block;
}

.legend-dot.default { background: linear-gradient(to top, var(--vp-c-brand-soft), var(--vp-c-brand-1)); }
.legend-dot.comparison { background: #f59e0b; }
.legend-dot.swap { background: #ef4444; }
.legend-dot.current-min { background: #8b5cf6; }
.legend-dot.key { background: #06b6d4; }
.legend-dot.empty { border: 1.5px dashed var(--vp-c-text-3); background: transparent; }
.legend-dot.left-range { background: #3b82f6; }
.legend-dot.right-range { background: #ec4899; }
.legend-dot.pivot { background: #f59e0b; }
.legend-dot.sorted { background: #10b981; }

/* 柱状图区域 */
.bars-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 300px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed var(--vp-c-divider);
}

.bars-container.embedded-bars {
  height: 200px;
  padding: 10px;
}

.dark .bars-container {
  background: rgba(255, 255, 255, 0.01);
}

.bar-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: flex-end;
}

.bar {
  position: relative;
  width: 80%;
  max-width: 32px;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 6px;
  transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s ease;
}

/* 状态色 */
.bar.default {
  background: linear-gradient(to top, var(--vp-c-brand-soft), var(--vp-c-brand-1));
}
.bar.comparison {
  background: linear-gradient(to top, rgba(245, 158, 11, 0.3), #f59e0b);
}
.bar.swap {
  background: linear-gradient(to top, rgba(239, 44, 44, 0.3), #ef4444);
}
.bar.current-min {
  background: linear-gradient(to top, rgba(139, 92, 246, 0.3), #8b5cf6);
}
.bar.key {
  background: linear-gradient(to top, rgba(6, 182, 212, 0.3), #06b6d4);
}
.bar.left-range {
  background: linear-gradient(to top, rgba(59, 130, 246, 0.3), #3b82f6);
}
.bar.right-range {
  background: linear-gradient(to top, rgba(236, 72, 153, 0.3), #ec4899);
}
.bar.pivot {
  background: linear-gradient(to top, rgba(245, 158, 11, 0.3), #f59e0b);
}
.bar.sorted {
  background: linear-gradient(to top, rgba(16, 185, 129, 0.3), #10b981);
}

/* 插入排序专用空槽柱 */
.empty-slot-bar {
  border: 2px dashed var(--vp-c-text-3);
  background: rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.dark .empty-slot-bar {
  background: rgba(255, 255, 255, 0.05);
}

.empty-value {
  color: var(--vp-c-text-3) !important;
  text-shadow: none !important;
}

/* 桶排序分发后的原空缺位（渲染为超矮透明块） */
.distributed-slot-bar {
  background: rgba(99, 102, 241, 0.08) !important;
  border: 1px dashed rgba(99, 102, 241, 0.3);
  box-sizing: border-box;
}

.bar-value {
  font-size: 11px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  font-family: var(--vp-font-family-mono, monospace);
}

/* 桶排序专用桶列表显示 */
.buckets-area {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  margin-top: 10px;
  animation: fadeIn 0.4s both;
}

.bucket-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.015);
  transition: all 0.3s ease;
  min-height: 110px;
}

.dark .bucket-container {
  background: rgba(255, 255, 255, 0.01);
}

.bucket-container.active-bucket {
  border-color: var(--vp-c-brand-1);
  background: rgba(99, 102, 241, 0.03);
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.15);
}

.dark .bucket-container.active-bucket {
  background: rgba(99, 102, 241, 0.05);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
}

.bucket-label {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.bucket-elements {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  height: 80px;
  padding: 6px;
  border-top: 1px dashed var(--vp-c-divider);
}

.bucket-element-block {
  width: 22px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, var(--vp-c-brand-soft), var(--vp-c-brand-1));
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  font-family: var(--vp-font-family-mono, monospace);
  transition: all 0.2s ease;
}

.bucket-element-block.active {
  background: linear-gradient(to top, rgba(245, 158, 11, 0.3), #f59e0b);
}

.bucket-empty-text {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 24px;
  font-style: italic;
}

/* 信息面板 */
.info-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono, monospace);
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--vp-c-brand-1);
  border-radius: 3px;
  transition: width 0.2s ease;
}

.step-description {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.desc-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
}

.desc-text {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .controls-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .control-buttons {
    width: 100%;
    justify-content: space-between;
  }
  .bars-container {
    height: 220px;
  }
  .buckets-area {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
