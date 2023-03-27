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

function solution(tickets) {
  const map = {};
  tickets.forEach(([departure, arrival]) => {
    if (map[departure]) map[departure].push(arrival);
    else map[departure] = [arrival];
  });

  for (let key in map) {
    map[key].sort((a, b) => (a > b) - (a < b));
  }

  const queue = new Queue();

  queue.enqueue({ departure: "ICN", route: ["ICN"], map: map });
  while (queue.size() > 0) {
    const { departure, route, map } = queue.dequeue();
    if (route.length === tickets.length + 1) return route;
    if (map[departure].length === 0) continue;

    map[departure].forEach((arrival, index) => {
      const newMap = JSON.parse(JSON.stringify(map));
      const newRoute = [...route, arrival];
      newMap[departure] = newMap[departure].filter((_, i) => i !== index);
      queue.enqueue({ departure: arrival, route: newRoute, map: newMap });
    });
  }
}

//주어진 항공권을 모두 소모해야한다. 즉 티켓의 길이만큼 소모해야 한다.

const tickets = [
  ["ICN", "JFK"],
  ["HND", "IAD"],
  ["JFK", "HND"],
];
const r = solution(tickets);
console.log(r);
