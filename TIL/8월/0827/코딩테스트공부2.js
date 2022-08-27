class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
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
}

function solution(alp, cop, problems) {
  let maxAlq = 0;
  let maxCop = 0;
  problems.forEach(([alp_req, cop_req]) => {
    maxAlq = Math.max(maxAlq, alp_req);
    maxCop = Math.max(maxCop, cop_req);
  });

  const queue = new Queue();
  let answer = Infinity;

  queue.enqueue({ alp, cop, sum: 0 });
  while (queue.size() > 0) {
    const { alp, cop, sum } = queue.dequeue();
    if (alp >= maxAlq && cop >= maxCop) {
      answer = Math.min(answer, sum);
      continue;
    }

    problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
      if (alp >= alp_req && cop >= cop_req) {
        queue.enqueue({ alp: alp + alp_rwd, cop: cop + cop_rwd, sum: sum + cost });
      }
    });
    if (alp < maxAlq) {
      queue.enqueue({ alp: alp + 1, cop: cop, sum: sum + 1 });
    }

    if (cop < maxCop) {
      queue.enqueue({ alp: alp, cop: cop + 1, sum: sum + 1 });
    }
  }
  return answer;
}

const alp = 10;
const cop = 10;
const problems = [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
];
const r = solution(alp, cop, problems);
console.log(r);
