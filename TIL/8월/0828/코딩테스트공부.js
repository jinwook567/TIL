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
  problems.push([0, 0, 1, 0, 1]);
  problems.push([0, 0, 0, 1, 1]);

  const d = Array(maxAlq + 1)
    .fill()
    .map((_) => Array(maxCop + 1).fill(Infinity));

  d[alp][cop] = 0;

  //alp,cop보다 작을 경우만 넣어야한다.
  const queue = new Queue();

  queue.enqueue({ alp, cop });
  while (queue.size() > 0) {
    const { alp, cop } = queue.dequeue();
    problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
      if (alp >= alp_req && cop >= cop_req) {
        const n_alp = alp_rwd + alp > maxAlq ? maxAlq : alp_rwd + alp;
        const n_cop = cop_rwd + cop > maxCop ? maxCop : cop_rwd + cop;
        d[n_alp][n_cop] = Math.min(d[n_alp][n_cop], d[alp][cop] + cost);
        if (d[n_alp][n_cop] === d[alp][cop] + cost) {
          queue.enqueue({ alp: n_alp, cop: n_cop });
        }
      }
    });
  }

  return d[maxAlq][maxCop];
}

// d[alp_rwd + alp_req][cop_rwd + cop_req] = Math.min(
//     d[alp_rwd + alp_req][cop_rwd + cop_req],
//     d[alp_req][cop_req] + cost
//   );
const alp = 10;
const cop = 10;
const problems = [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
];
const r = solution(alp, cop, problems);
console.log(r);
