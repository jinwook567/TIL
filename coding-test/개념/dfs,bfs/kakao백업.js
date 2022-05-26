// solution2
class Queue {
  constructor(data) {
    this.queue = data;
    this.front = 0;
    this.rear = data.length;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }
}

function solution(queue1, queue2) {
  let answer = 0;

  const len = queue1.length;
  let sumQ1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let sumQ2 = queue2.reduce((acc, cur) => acc + cur, 0);
  const target = (sumQ1 + sumQ2) / 2;

  const que1 = new Queue(queue1);
  const que2 = new Queue(queue2);

  function getSumToTarget(arr, target) {
    let sum = 0;
    let i = 0;
    while (sum < target) {
      sum += arr[i];
      i++;
      if (i === arr.length - 1) return i;
    }
    return i;
  }

  while (true) {
    if (sumQ1 === target) {
      return answer;
    }

    if (sumQ1 === 0 || sumQ2 === 0) return -1;
    // 큐가 비었을 때가 맞긴 한데, 큐를 조금 더 빨리 비울 수 있는 방법이 있는지..
    // 우선순위 큐..?
    // 몇이 필요한 만큼, 큐를 한꺼번에 해주면 되잖아.
    // dequeue도 한번에 여러번하고,
    // if(answer > len * 5) return -1

    if (sumQ1 > sumQ2) {
      const dequeued = que1.dequeue();
      que2.enqueue(dequeued);
      sumQ1 -= dequeued;
      sumQ2 += dequeued;
    } else {
      const dequeued = que2.dequeue();
      que1.enqueue(dequeued);
      sumQ1 += dequeued;
      sumQ2 -= dequeued;
    }
    answer += 1;
  }
}

function findWay(start, end, target) {
  const visited = Array(n + 1).fill(false);
  const queue = [];
  queue.unshift(start);
  while (queue.length !== 0) {
    const last = queue.pop();
    const list = paths.filter(([start, end, cost]) => start === last);
    for (let [start, end, cost] of list) {
      if (!visited[end]) {
      }
    }
  }
}

function solution(queue1, queue2) {
  let answer = 0;

  let sumQ1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let sumQ2 = queue2.reduce((acc, cur) => acc + cur, 0);

  const target = (sumQ1 + sumQ2) / 2;

  const getSum = (arr, target) => {
    let sum = 0;
    let index = 0;

    while (sum < target && index < arr.length) {
      sum += arr[index];
      index++;
    }
    return { sum, index };
  };

  while (true) {
    if (sumQ1 === target) {
      return answer;
    }

    if (sumQ1 === 0 || sumQ2 === 0) return -1;
    //큐가 비는 시점이 문제가 있는 순간임.

    if (sumQ1 > sumQ2) {
      const target = sumQ1 - sumQ2;
      const { index:i, sum } = getSum(queue1, target);
      queue1 = queue1.slice(i + 1);
      const dequeued = queue1.slice(0, i);
      queue2 = queue2.concat(dequeued);
      sumQ1 -= sum;
      sumQ2 += sum;
    } else {
      const target = sumQ2 - sumQ1
      const { index:i, sum } = getSum(queue2, target);
      queue2 = queue2.slice(i+1)
      const dequeued = queue2.slice(0, i)
      queue1 = queue1.concat(dequeued)
      sumQ1 += sum
      sumQ2 -= sum
    }
    answer += 1;
  }
}
