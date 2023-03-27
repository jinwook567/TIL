class Queue {
  constructor(data) {
    this.front = 0;
    this.rear = data.length;
    this.queue = data;
  }

  enqueue(data) {
    this.queue[this.rear++] = data;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }

  get() {
    return this.queue.slice(this.front, this.rear);
  }
}

function solution(queue1, queue2) {
  const q1 = new Queue(queue1);
  const q2 = new Queue(queue2);
  const queue = new Queue();
  queue.enqueue({ q1, q2, cnt: 0 });

  while (queue.size() > 0) {
    const { q1, q2, cnt } = queue.dequeue();
    const sum1 = q1.get().reduce((acc, cur) => acc + cur, 0);
    const sum2 = q2.get().reduce((acc, cur) => acc + cur, 0);
    if (sum1 === sum2) return cnt;
  }
  return -1;
}

const queue1 = [3, 2, 7, 2];
const queue2 = [4, 6, 5, 1];
const r = solution(queue1, queue2);
console.log(r);
