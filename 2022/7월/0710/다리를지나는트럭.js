class Queue {
  constructor(arr) {
    this.front = 0;
    this.rear = arr ? arr.length : 0;
    this.queue = arr ? [...arr] : [];
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
    return this.queue[this.front];
  }
}

function solution(bridge_length, weight, truck_weights) {
  let bridge = [];
  let bridgeWeight = 0;
  const truck = new Queue(truck_weights);

  let time = 1;

  const dequeued = truck.dequeue();
  bridgeWeight += dequeued;
  bridge.push({ left: bridge_length, weight: dequeued });

  while (truck.size() > 0) {
    time++;
    bridge = bridge.map((v) => ({ ...v, left: v.left - 1 }));

    const out = bridge.filter((v) => v.left === 0).reduce((acc, cur) => acc + cur.weight, 0);
    bridge = bridge.filter((v) => v.left !== 0);
    bridgeWeight -= out;

    //다리에 들어갈 수 있다면
    if (bridgeWeight + truck.get() <= weight && bridge.length < bridge_length) {
      const dequeued = truck.dequeue();
      bridge.push({ left: bridge_length, weight: dequeued });
      bridgeWeight += dequeued;
    }
  }
  return time + bridge.reduce((acc, cur) => acc + cur.left, 0);
}

const r = solution(2, 10, [7, 4, 5, 6]);
const r2 = solution(100, 100, [10]);
console.log(r);
console.log(r2);
