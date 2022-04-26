//bfs는 queue를 이용해서 구현한다.
class Queue {
  constructor() {}
}

//우선 unshift(), pop()을 이용해서 queue를 구현.
const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
const visited = Array(graph.length).fill(false);
const queue = [];

function bfs(graph, v, visited) {
  visited[v] = true;
  queue.unshift(v);
  //재귀 함수가 아니기 때문에 넣어줘야한다.
  while (queue.length !== 0) {
    console.log(queue);
    const last = queue.pop();
    console.log(last);
    for (let i of graph[last]) {
      if (!visited[i]) {
        queue.unshift(i);
        visited[i] = true;
        //queue에 들어가있으면 또 들어가면 안된다.
      }
    }
  }
}

bfs(graph, 1, visited);

//이후에 연결리스트로 하는 법 공부해서 리팩토링.
