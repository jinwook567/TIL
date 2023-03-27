//완전 이진트리 형태
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(aIndex, bIndex) {
    [this.heap[aIndex], this.heap[bIndex]] = [this.heap[bIndex], this.heap[aIndex]];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (parentIndex >= 0 && this.heap[parentIndex] < value) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    const end = this.heap.pop();
    this.heap[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }
    return root;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(aIndex, bIndex) {
    [this.heap[aIndex], this.heap[bIndex]] = [this.heap[bIndex], this.heap[aIndex]];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (parentIndex >= 0 && this.heap[parentIndex] > value) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    const end = this.heap.pop();
    this.heap[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      this.heap[currentIndex] > this.heap[leftIndex] ||
      this.heap[currentIndex] > this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] > this.heap[rightIndex]) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        //rightIndex 없을 때도 여기.
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      }

      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }

    return root;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  swap(a, b) {
    const temp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = temp;
  }

  enqueue(priority, value) {
    const node = { priority, value };
    this.queue.push(node);

    let currentIndex = this.queue.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      parentIndex >= 0 &&
      this.queue[parentIndex].priority < this.queue[currentIndex].priority
    ) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  dequeue() {
    if (this.queue.length === 0) return undefined;
    if (this.queue.length === 1) return this.queue.pop();

    const root = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      (this.queue[leftIndex] &&
        this.queue[currentIndex].priority < this.queue[leftIndex].priority) ||
      (this.queue[rightIndex] &&
        this.queue[currentIndex].priority < this.queue[rightIndex].priority)
    ) {
      //에러날수도 있다. priority 없다고..

      if (
        !this.queue[rightIndex] ||
        this.queue[leftIndex].priority > this.queue[rightIndex].priority
      ) {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      } else {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      }
      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }
    return root;
  }

  size() {
    return this.queue.length;
  }
}

const maxHeap = new MaxHeap();
maxHeap.push(3);
maxHeap.push(10);
maxHeap.push(12);
maxHeap.push(-1);
maxHeap.push(100);
maxHeap.push(200);

const minHeap = new MinHeap();
minHeap.push(1);
minHeap.push(20);
minHeap.push(-100);
minHeap.push(30);
minHeap.push(50);
minHeap.push(90);
minHeap.push(1);
minHeap.push(-900);
