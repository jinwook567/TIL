//DFS Deep First Search
//stack을 이용하여 구현하는데 재귀함수의 원리가 스택이므로 재귀함수를 이용해서 구현하면 편리하다.

//인접리스트 방식. 모든 노드에 연결된 정보를 차례대로 알려줌.
const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
//0은 없는 것 처리.
//1,2,3,4,5,6,7,8 노드 연결 상태

const visited = Array(graph.length).fill(false);

function dfs(graph, v, visited) {
  //v는 현재 node를 말함.
  visited[v] = true;
  //방문처리.
  console.log(v);

  graph[v].forEach((node) => {
    if (!visited[node]) {
      dfs(graph, node, visited);
    }
  });
}

function dfs2(graph, v, visited) {
  //v는 현재 node를 말한다.
  visited[v] = true;
  console.log(v);
  for (let i of graph[v]) {
    if (!visited[i]) {
      dfs(graph, i, visited);
      //재귀함수로 스택이다.
      //처음으로 [2,3,8]을 마주하게 되는데, 2로 재귀함수를 실행한다.
      //1은 visited이기 때문에 7을 방문한다.
      //6을 방문한다. 7을 이미 방문했기 때문에 코드가 실행되지 않는다.
      //다시 3으로 돌아온다.
    }
  }
}

//dfs(graph, 1, visited);

//인접 행렬 방식
const graph2 = [
  [0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 1, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

const visited2 = Array(5).fill(false);

function dfs3(graph, v, visited) {
  visited[v] = true;
  console.log(v);
  for (let i = 0; i < graph[v].length; i++) {
    if (graph[v][i] === 1 && !visited[i]) {
      //graph가 연결되어있고, 방문하지 않았다면 방문해라.
      dfs2(graph, i, visited);
    }
  }
}

dfs(graph, 1, visited);

//dfs2(graph2, 0, visited2);
