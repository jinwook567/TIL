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

function solution(operations) {
  let heapCnt = 0;
  const maxHeap = new MaxHeap();
  const minHeap = new MaxHeap();

  operations.forEach((v) => {
    const [command, number] = v.split(" ");
    if (command === "I") {
      maxHeap.push(Number(number));
      minHeap.push(-Number(number));
      heapCnt++;
    }

    if (command === "D") {
      if (heapCnt === 0) return;
      heapCnt--;
      if (Number(number) === -1) {
        minHeap.pop();
      } else {
        maxHeap.pop();
      }
      if (heapCnt === 0) {
        minHeap.heap = [];
        maxHeap.heap = [];
      }
    }
  });

  if (heapCnt === 0) return [0, 0];
  return [maxHeap.pop(), -minHeap.pop()];
}

const operations = ["I 16", "D -1", "I 15"];
const r = solution(operations);
console.log(r);
