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

function solution(A, B) {
  //B에서 최대힙으로 뽑는다.
  //A에서도 최대힙으로 뽑아나간다. 만약 일치가 되면, 더해주고, B에서도 최대힙으로 뽑는다.
  const heap_A = new MaxHeap();
  const heap_B = new MaxHeap();
  const len = A.length;

  for (let i = 0; i < len; i++) {
    heap_A.push(A[i]);
    heap_B.push(B[i]);
  }
  let answer = 0;

  let maxA = heap_A.pop();
  let maxB = heap_B.pop();

  while (maxA) {
    if (maxA < maxB) {
      answer++;
      maxA = heap_A.pop();
      maxB = heap_B.pop();
    } else {
      maxA = heap_A.pop();
    }
  }
  return answer;
}

const A = [5, 1, 3, 7];
const B = [2, 2, 6, 8];
const r = solution(A, B);
console.log(r);
