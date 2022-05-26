// * 배열 돌리기.
function turnRight(arr) {
  const row = arr[0].length;
  const column = arr.length;
  //column, row 개수인데
  const newArr = Array(row)
    .fill()
    .map(() => Array(column).fill(0));

  for (let i = 0; i < column; i++) {
    for (let j = row - 1; j >= 0; j--) {
      newArr[i][row - 1 - j] = arr[j][i];
    }
  }

  return newArr;
}

// * 이진 탐색
function binarySearch(arr, target, start, end) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] > target) {
    return binarySearch(arr, target, start, mid - 1);
    //꼭 return을 해줘야한다. return을 해주지 않으면, undefined를 배출하고만다.
  } else {
    return binarySearch(arr, target, mid + 1, end);
    //꼭 return을 해줘야한다. return을 해주지 않으면, undefined를 배출하고만다.
  }
}

// * queue
class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
  }

  enqueue(data) {
    this.queue.push(data);
    this.rear++;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  peek() {
    return this.queue[this.front];
  }

  size() {
    return this.rear - this.front;
  }
}

// * 다익스트라 알고리즘
function solution(graph, V) {
  //V는 노드의 개수
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
  //해당 파트 최소힙을 통해서 간소화 시킬 수 있다.

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

// * 플로이드워셜 알고리즘
function solution(graph, V) {
  //모든 노드에 대해서 중간으로 거쳐가는 경우.
  //V는 노드의 개수.
  const arr = [];
  for (let i = 0; i < V; i++) {
    arr.push(Array(V).fill(Infinity));
  }

  //본인에서 본인으로 가는 거리 0으로 초기화.
  for (let i = 0; i < V; i++) {
    arr[i][i] = 0;
  }

  for (let data of graph) {
    const [start, end, distance] = data;
    arr[start - 1][end - 1] = distance;
    //나의 node는 0부터 시작하기에 1을 빼줬다.
  }

  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      for (let k = 0; k < V; k++) {
        if (arr[j][k] > arr[j][i] + arr[i][k]) {
          arr[j][k] = arr[j][i] + arr[i][k];
        }
      }
    }
  }

  return arr;
}

class Node {
  constructor(value, address) {
    this.value = value;
    this.address = address;
  }
}

class Queue {
  enqueue(value) {}
}
