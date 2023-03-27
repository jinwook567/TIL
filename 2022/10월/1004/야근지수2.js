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

function solution(n, works) {
  const heap = new MaxHeap();
  works.forEach((v) => heap.push(v));

  while (n > 0) {
    const max = heap.pop();
    n -= 1;
    if (max === 0) return 0;
    heap.push(max - 1);
  }
  return heap.heap.reduce((acc, cur) => acc + cur * cur, 0);
}
const works = [2, 1, 2];
const n = 1;
const r = solution(n, works);
console.log(r);
