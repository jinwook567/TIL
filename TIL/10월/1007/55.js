function minCostPath(gNodes, gFrom, gTo, gWeight, x, y) {
  const graph = [];
  for (let i = 0; i < gFrom.length; i++) {
    graph.push([gFrom[i], gTo[i], gWeight[i]]);
    graph.push([gTo[i], gFrom[i], gWeight[i]]);
  }

  function dijkstra(n, graph, start, end) {
    const d = Array(n + 1).fill(Infinity);
    d[start] = 0;
    const queue = new PriorityQueue();
    queue.enqueue(0, start);

    while (queue.size() > 0) {
      const { value: node, priority: dist } = queue.dequeue();
      if (-dist > d[node]) continue;

      graph[node].forEach(([arrive, cost]) => {
        d[arrive] = Math.min(d[arrive], d[node] + cost);
        if (d[arrive] === d[node] + cost) queue.enqueue(-d[arrive], arrive);
      });
    }
    return d[end];
  }

  const first = dijkstra(gNodes, graph, 1, x);
  const second = 
}
