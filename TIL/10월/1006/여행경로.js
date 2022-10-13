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

const findMatchTickets = (start, tickets, visited) => {
  const result = [];
  for (let i = 0; i < tickets.length; i++) {
    if (!visited[i] && tickets[i][0] === start) {
      result.push({ i, end: tickets[i][1] });
    }
  }
  result.sort((a, b) => (a.end > b.end) - (a.end < b.end));
  return result;
};

function solution(tickets) {
  tickets.forEach(([start, end]) => {
    set.add(start);
    set.add(end);
  });

  const visited = Array(tickets.length).fill(false);

  const queue = new Queue();
  queue.enqueue({ visited, path: ["ICN"] });

  while (queue.size() > 0) {
    const { visited, path } = queue.dequeue();
    if (visited.every((v) => v)) return path;

    const lastVisited = path[path.length - 1];
    const matchedTickets = findMatchTickets(lastVisited, tickets, visited);

    matchedTickets.forEach(({ i, end }) => {
      const newVistied = [...visited];
      newVistied[i] = true;
      queue.enqueue({ visited: newVistied, path: [...path, end] });
    });
  }
}

const tickets = [
  ["ICN", "SFO"],
  ["ICN", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "ICN"],
  ["ATL", "SFO"],
];
const r = solution(tickets);
console.log(r);
