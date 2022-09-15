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

function solution(alp, cop, problems) {
  let answer = Infinity;

  problems.push([0, 0, 1, 0, 1]);
  problems.push([0, 0, 0, 1, 1]);

  const t_alp = Math.max(...problems.map((v) => v[0]));
  const t_cop = Math.max(...problems.map((v) => v[1]));

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(0, { alp, cop });

  while (priorityQueue.size() > 0) {
    const {
      priority: cost,
      value: { alp, cop },
    } = priorityQueue.dequeue();
    if (alp >= t_alp && cop >= t_cop) {
      answer = Math.min(answer, cost);
      break;
    }

    problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, p_cost]) => {
      if (alp >= alp_req && cop >= cop_req) {
        if (alp >= t_alp && cop_rwd === 0) return;
        if (cop >= t_cop && alp_rwd === 0) return;
        priorityQueue.enqueue(cost - p_cost, { alp: alp + alp_rwd, cop: cop + cop_rwd });
      }
    });
  }
  return -answer;
}

const alp = 10;
const cop = 10;
const problems = [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
];
const r = solution(alp, cop, problems);
console.log(r);
