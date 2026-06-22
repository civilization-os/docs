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

---

## 2. 经典排序算法详解

### 2.1 冒泡排序 (Bubble Sort)

冒泡排序比较相邻的元素。如果第一个比第二个大，就交换它们两个。每一轮结束后，最大的元素会被“浮”到最后。

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

---

### 2.2 选择排序 (Selection Sort)

在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，以此类推。

::: warning 稳定性警告
选择排序是**不稳定**的。
:::

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

---

### 2.3 插入排序 (Insertion Sort)

对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

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

---

### 2.4 归并排序 (Merge Sort)

归并排序是采用**分治法（Divide and Conquer）**的典型应用。将两个排好序的子序列合并。

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

---

### 2.5 快速排序 (Quick Sort)

通过一趟排序将要分类的数据分割成独立的两部分，一部分比基准值小，另一部分比基准值大。

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
