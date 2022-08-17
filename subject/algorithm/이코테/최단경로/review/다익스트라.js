function dijkstra(n, graph, start) {
  const visited = Array(n + 1).fill(false);
  visited[0] = true;
  const distance = Array(n + 1).fill(Infinity);
  distance[start] = 0;

  const findMinium = (distance) => {
    let min = Infinity;
    let index = 0;
    distance.forEach((d, i) => {
      if (min > d && !visited[i]) {
        min = d;
        index = i;
      }
    });
    return index;
  };

  const getNodes = (graph, start) => {
    return graph.filter(([s, e, d]) => s === start);
  };

  while (true) {
    const allVisited = visited.reduce((acc, cur) => {
      if (acc === false) return false;
      if (cur === false) return false;
      return acc;
    }, true);

    if (allVisited) break;
    const startNode = findMinium(distance);
    visited[startNode] = true;

    const nodes = getNodes(graph, startNode);
    nodes.forEach(([s, e, d]) => {
      if (distance[e] > distance[s] + d) {
        distance[e] = distance[s] + d;
      }
    });
  }
  console.log(distance);
}

const graph = [
  [1, 2, 2],
  [1, 3, 5],
  [1, 4, 1],
  [2, 3, 3],
  [2, 4, 2],
  [3, 2, 3],
  [3, 6, 5],
  [4, 3, 3],
  [4, 5, 1],
  [5, 3, 1],
  [5, 6, 2],
];
dijkstra(6, graph, 1);
