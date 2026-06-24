# 第一章：排序算法

排序算法是计算机科学中最基础、最核心的算法之一。衡量排序算法优劣通常从时间复杂度、空间复杂度和稳定性三个维度进行考量。

---

## 1. 常用排序算法复杂度汇总

| 算法名称 | 平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 稳定性 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **冒泡排序** (Bubble Sort) | $O(n^2)$ | $O(n)$ | $O(n^2)$ | $O(1)$ | 稳定 |
| **选择排序** (Selection Sort) | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | 不稳定 |
| **插入排序** (Insertion Sort) | $O(n^2)$ | $O(n)$ | $O(n^2)$ | $O(1)$ | 稳定 |
| **归并排序** (Merge Sort) | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | 稳定 |
| **快速排序** (Quick Sort) | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | 不稳定 |
| **堆排序** (Heap Sort) | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | 不稳定 |
| **桶排序** (Bucket Sort) | $O(n + k)$ | $O(n + k)$ | $O(n^2)$ | $O(n + k)$ | 稳定 |

---

## 排序算法综合演示

<SortingVisualizer />

---

## 2. 经典排序算法详解

### 2.1 冒泡排序 (Bubble Sort)

冒泡排序比较相邻的元素。如果第一个比第二个大，就交换它们两个。每一轮结束后，最大的元素会被“浮”到最后。

#### 2.1.1 动态演示
<SortingVisualizer algo="bubble" />

#### 2.1.2 算法原理
冒泡排序的具体执行过程如下：
1. **比较相邻元素**：从数组起始位置开始，依次比较相邻的两个元素 `arr[j]` 和 `arr[j + 1]`。
2. **交换位置**：如果当前元素大于后一个元素（即 `arr[j] > arr[j + 1]`），则交换它们位置；否则保持不动。
3. **完成一轮浮动**：对每一对相邻元素做同样的工作，从第一对一直到未排序部分的最后一对。这一步完成后，未排序部分的**最大元素**就会像气泡一样“浮动”到该轮的末尾位置，该位置即被确定为已排序。
4. **重复循环**：针对剩余未排序的元素重复上述步骤 1~3。
5. **提前结束优化**：如果在一轮比较中没有发生任何一次交换，说明整个数组已经是有序的，此时可以直接提前终止算法。

#### 2.1.3 代码实现

::: details 点击查看代码实现
```javascript
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
```
:::

---

### 2.2 选择排序 (Selection Sort)

在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，以此类推。

::: warning 稳定性警告
选择排序是**不稳定**的。
:::

#### 2.2.1 动态演示
<SortingVisualizer algo="selection" />

#### 2.2.2 算法原理
选择排序的具体执行过程如下:
1. **划定边界与初始假设**：将数组分为“已排序”和“未排序”两部分（初始已排序部分为空）。在每一轮开始时，假设当前未排序序列的首个元素为当前的**最小值**，并记录其索引为 `minIndex = i`。
2. **扫描寻找真实最小值**：遍历未排序序列中该元素后面的所有其余项（从 `i + 1` 到 `n - 1`），将每一项的值与当前 `arr[minIndex]` 进行比较。
3. **更新最小值索引**：如果在扫描过程中发现某个元素的值更小，即 `arr[j] < arr[minIndex]`，则将 `minIndex` 更新为当前这个更小元素的索引 `j`。
4. **交换元素**：当扫描完整个未排序序列后，如果最终确定的 `minIndex` 不等于初始假设的位置 `i`，则将未排序区间的首位元素 `arr[i]` 与找到的真实最小值元素 `arr[minIndex]` 进行位置交换。
5. **扩大已排序区间**：把索引 `i` 归入已排序区域，未排序区域的起点向后移动一位，重复以上步骤 1~4，直到整个数组全部排序完毕。

#### 2.2.3 代码实现

::: details 点击查看代码实现
```javascript
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```
:::

---

### 2.3 插入排序 (Insertion Sort)

对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

#### 2.3.1 动态演示
<SortingVisualizer algo="insertion" />

#### 2.3.2 算法原理
插入排序的具体执行过程如下：
1. **初始化已排序序列**：默认数组的第一个元素 `arr[0]` 构成一个已排序的序列，后续其余元素为未排序序列。
2. **提取待插入元素**：从索引 `1` 开始，取出未排序区间的第一个元素作为待插入的“键值” `key = arr[i]`，原位置暂时留空。
3. **向后扫描并位移**：在已排序的序列中从后向前扫描。将每一个已排序的元素与 `key` 比较：
   - 如果该已排序的元素大于 `key`，则将这个元素向后挪动一位（即 `arr[j + 1] = arr[j]`），从而给 `key` 空出前移的位置。
   - 如果该已排序的元素小于或等于 `key`，或者已经扫描到了数组的最左端（`j < 0`），则停止扫描。
4. **插入键值**：将提取出来的 `key` 插入到此时空出来的合适位置 `arr[j + 1]`。
5. **重复循环**：针对未排序部分的下一个元素，重复步骤 2~4，直到所有的未排序元素都顺利插入到已排序部分。

#### 2.3.3 代码实现

::: details 点击查看代码实现
```javascript
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```
:::

---

### 2.4 归并排序 (Merge Sort)

归并排序是采用**分治法（Divide and Conquer）**的典型应用。将两个排好序的子序列合并。

#### 2.4.1 动态演示
<SortingVisualizer algo="merge" />

#### 2.4.2 算法原理
归并排序的具体执行过程基于**分治策略**：
1. **分 (Divide - 分割)**：
   - 计算区间中点 `mid = Math.floor((left + right) / 2)`。
   - 递归地将当前待排序区间分为左右两个子序列：左半部分 `[left, mid]` 和右半部分 `[mid + 1, right]`。
   - 重复这个分割过程，直到子序列的长度为 1（长度为 1 的子序列天生是有序的）。
2. **治 (Conquer - 排序解决)**：
   - 长度为 1 的子区间直接返回。而长区间则利用递归调用的结果，确保左半边子序列和右半边子序列已经是排好序的状态。
3. **合 (Combine - 归并合并)**：
   - 将两个排好序的子序列合并（Merge）成一个完整有序的长序列。
   - **合并细节**：使用两个指针 `i` 和 `j` 分别指向两个子序列的起始位置。比较两处的元素，将较小者拷贝进辅助数组，然后将对应指针向后移动一步。重复比较，直到某一个子序列被取空；然后把另一个子序列中剩余的所有元素原封不动地追加到辅助序列尾部。
   - 最后，将辅助数组中的有序序列写回原数组的对应区间中。

#### 2.4.3 代码实现

::: details 点击查看代码实现
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```
:::

---

### 2.5 快速排序 (Quick Sort)

通过一趟排序将要分类的数据分割成独立的两部分，一部分比基准值小，另一部分比基准值大。

#### 2.5.1 动态演示
<SortingVisualizer algo="quick" />

#### 2.5.2 算法原理
快速排序的具体执行过程基于**分区与递归**：
1. **选择基准值 (Pivot)**：在当前排序区间中选择一个元素作为基准值。通常选择区间的最右端元素 `arr[right]` 或是最左端元素，或者随机选择。
2. **分区操作 (Partition)**：
   - 初始化一个慢指针 `i = left - 1`，表示小于 Pivot 区间的边界。
   - 使用快指针 `j` 从 `left` 到 `right - 1` 扫描每一个元素。
   - 将当前扫描元素 `arr[j]` 与基准值 Pivot 比较：若 `arr[j] < Pivot`，则将慢指针向右移动一位 `i++`，并交换 `arr[i]` 和 `arr[j]` 的位置，从而让较小元素移动到左边。
   - 循环结束后，将基准值自身与 `arr[i + 1]` 交换位置。此时，基准值 Pivot 正好处于其排序后的最终正确位置 `i + 1`，在其左侧的元素都比它小，在其右侧的元素都比它大。
3. **递归排序**：以基准值位置为界，将数组切分为两个子序列，分别递归调用快速排序算法，直到子序列长度为 1 或 0 时返回。

#### 2.5.3 代码实现

::: details 点击查看代码实现
```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
```
:::

---

### 2.6 桶排序 (Bucket Sort)

桶排序工作原理是将数组分到有限数量的桶里。每个桶再个别排序（通常用插入排序）。它是**外部排序**的一种常见代表，适用于数据分布均匀的场景。

#### 2.6.1 动态演示
<SortingVisualizer algo="bucket" />

#### 2.6.2 算法原理
桶排序的具体执行过程如下：
1. **寻找范围并确定桶数**：扫描待排序数组，找出其中的最大值 `max` 和最小值 `min`。根据数据的分布区间和个数，决定划分的桶个数 `bucketCount`，并初始化各个桶容器（通常是动态数组）。
2. **元素分配（映射到桶）**：遍历待排序数组，利用映射函数（例如 `(val - min) / bucketRange`）计算出每个元素对应落入的桶索引 `bucketIndex`，并将元素加入到相应的桶中。
3. **桶内分别排序**：对每个非空的桶进行内部排序。因为每个桶内的数据量通常比较小，常选用效率高且稳定的**插入排序**进行内部排序。
4. **收集回收数据**：当所有的桶都在内部排序完毕后，按照桶的索引顺序（从第 0 个桶到最后一个桶），依次将各桶中的有序数据提取出来，按顺序写回原数组中。至此，整个数组即成为有序序列。

#### 2.6.3 代码实现

::: details 点击查看代码实现
```javascript
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    else if (arr[i] > max) max = arr[i];
  }

  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  const result = [];
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    result.push(...buckets[i]);
  }

  return result;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```
:::
