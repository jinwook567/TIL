//풀이는 맞는것 같은데 시간 복잡도가 맞나..?

function check(S) {
  for (let i = 0; i < S.length - 1; i++) {
    if (S.charAt(i) === S.charAt(i + 1)) return false;
  }
  return true;
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  swap(aIndex, bIndex) {
    const temp = this.queue[aIndex];
    this.queue[aIndex] = this.queue[bIndex];
    this.queue[bIndex] = temp;
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

function solution(S, C) {
  const priorityQueue = new PriorityQueue();

  priorityQueue.enqueue(0, [...S]);

  while (priorityQueue.size() > 0) {
    const { priority: cnt, value: arr } = priorityQueue.dequeue();
    console.log(cnt, arr);
    if (check(arr.filter((v) => v).join(""))) return -cnt;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        const newArr = [...arr];
        newArr[i] = null;
        priorityQueue.enqueue(cnt - C[i], newArr);
      }
    }
  }
}

const S = "abccbd";
const C = [0, 1, 2, 3, 4, 5];

const r = solution(S, C);
console.log({ r });
