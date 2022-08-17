//문제. 각 간선마다의 최소거리를 return 하라.
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

const V = 6;
//정점의 개수
const E = 11;
//간선의 개수

function solution(graph, V, E) {
  //0번째 무시하기.
  const visited = Array(V + 1).fill(false);
  visited[0] = true;
  //재귀함수 종료를 위해서

  const distance = Array(V + 1).fill(Infinity);
  distance[1] = 0;

  //방문하지 않은 노드중 최솟값 찾아주기.
  function getSmallestNode() {
    let minValue = Infinity;
    let index;
    for (let i = 1; i < visited.length; i++) {
      if (!visited[i]) {
        //방문을 하지 않았다면.
        if (distance[i] < minValue) {
          minValue = distance[i];
          index = i;
        }
      }
    }
    return index;
  }

  //첫 원소가 1인...
  function dijkstra(start) {
    if (visited.every((v) => v)) return;
    visited[start] = true;

    const nodes = graph.filter((data) => data[0] === start);
    for (let node of nodes) {
      const [st, end, dis] = node;
      if (distance[end] > dis + distance[start]) {
        distance[end] = dis + distance[start];
      }
    }

    const smallestNode = getSmallestNode();
    dijkstra(smallestNode);

    //방문하지 않은 노드중 최솟값을 찾고, 다익스트라 또 실행시키기.
    //재귀써서 만약 visted가 더이상 없다면, 멈춰라.
  }

  dijkstra(1);

  console.log(distance);
}

solution(graph, V, E);
