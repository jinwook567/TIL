class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.queue.push(node);
    let childIndex = this.queue.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (parentIndex >= 0) {
      if (this.queue[childIndex].priority > this.queue[parentIndex].priority) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      } else {
        break;
      }
    }
  }

  dequeue() {
    const max = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;
    let parentIndex = 0;
    let childIndex = parentIndex * 2 + 1;
    let swap = false;

    while (this.queue[childIndex]) {
      //왼쪽 비교
      if (this.queue[childIndex].priority > this.queue[parentIndex].priority) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        swap = true;
      }

      //오른쪽 비교
      childIndex++;
      if (
        this.queue[childIndex] &&
        this.queue[childIndex].priority > this.queue[parentIndex].priority
      ) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        swap = true;
      } else {
        childIndex--;
      }

      if (!swap) break;
      parentIndex = childIndex;
      childIndex = parentIndex * 2 + 1;
    }
    return max;
  }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue(10, 10);
priorityQueue.enqueue(9, 9);
priorityQueue.enqueue(8, 8);
priorityQueue.enqueue(7, 7);
priorityQueue.enqueue(6, 6);
priorityQueue.enqueue(5, 50);
priorityQueue.enqueue(4, 4);
console.log(priorityQueue.dequeue());
console.log(priorityQueue);
