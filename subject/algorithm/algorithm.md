# 투포인터 알고리즘

1차원 배열이 있고 두개의 포인터를 조작해가면서 원하는 값을 얻는다.
주로 합이 몇인 연속적인 부분 수열의 개수를 구하라 라는 문제에서 사용된다.

```
function twoPointer(arr, target) {
  let start = 0;
  let end = 0;
  let sum = arr[0];
  let cnt = 0;

  while (start <= arr.length - 1) {
    if (sum <= target && end < arr.length - 1) {
      sum += arr[++end];
    } else {
      sum -= arr[start++];
    }

    if (sum === target) cnt++;
  }
  return cnt;
}
```

# 슬라이딩 윈도우 알고리즘

슬라이딩 윈도우는 투포인터랑 매우 유사한 알고리즘이다. 다만 연속적인 부분 수열의 길이가 한정되있다는 점이 다르다. 창문을 미는 것처럼 부분 배열을 밀면서 값을 찾아나가면 된다. 2개의 변수를 활용하여 투포인터 처럼 구현해도 되고, 1개의 변수만 활용해도 좋다.

아래는 길이가 k인 부분 수열 중 가장 합이 큰 것을 리턴한 예제이다.

```
const arr = [12, 15, 11, 20, 25, 10, 20, 19, 13, 15];
const k = 3;
let sum = 0;
let answer = 0;

for (let i = 0; i < k; i++) {
  sum += arr[i];
}

for (let i = 0; i < arr.length - k; i++) {
  sum += arr[i + k];
  sum -= arr[i];
  answer = Math.max(answer, sum);
}
```

# 최장 증가 수열 알고리즘(LIS)

증가하는 부분 수열의 길이가 최대인 값을 구하는 알고리즘이다. 다이나믹 프로그래밍의 일종이고 d에는 자신이 부분 수열에 들어갔을 때 최대 길이를 리턴한다. 결과는 테이블에서 가장 큰 값을 찾으면 된다. d의 초기값은 1이다. 본인만 부분 수열에 들어갔을 경우 최소 1개를 만족하기 때문이다. 그리고 이 부분 수열은 연속적이지 않아도 좋다.

```
const arr = [1, 2, 3, 1, 3, 5, 2, 3];

const d = Array(arr.length).fill(1);
//초기값 1

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) d[i] = Math.max(d[i], d[j] + 1);
  }
}

const answer = Math.max(...d);
```

# 편집 거리 알고리즘

편집 거리 알고리즘은 두 문자열이 주어졌을 때, 얼마나 유사한지 판단하는 알고리즘이다. 즉 한 문자를 삽입,삭제, 수정을 최소한 몇번 거쳐야 두 문자열이 일치하는지 구할 수 있는 알고리즘이다. 다이나믹 프로그래밍의 일종이고 이차원 배열을 이용한다.

두 문자열 str_a, str_b를 비교한다고 할 때

1. str_a+1인 행을 만들고, str_b+1의 길이인 열을 가지는 이차원 배열을 만든다. +1을 해주는 이유는 공집합을 넣기 위해서이다.
2. 1열, 1행의 값을 초기화한다. 상대방의 문자가 공집합이라고 생각할 때 하나씩 문자를 추가한 길이이다.
3. 이중 루프를 돌면서 문자를 비교한다. 만일 현재 비교하는 두 문자가 동일하다면 왼쪽 위 값을 가져오면 된다. (변경할 게 없으므로), 그게 아니라면 왼쪽 위, 위, 왼쪽에서 가잘 작은 수를 구한 다음에 +1을 해주면 된다.
4. 배열의 가장 마지막 행, 마지막 열의 값이 최소 편집 길이이다.

```
const str_a = "cat";
const str_b = "cake";

//1
const d = Array(str_a.length + 1)
  .fill()
  .map((_) => Array(str_b.length + 1).fill(0));

//2
for (let i = 0; i <= str_a.length; i++) {
  d[i][0] = i;
}

for (let j = 0; j <= str_b.length; j++) {
  d[0][j] = j;
}

//3
for (let i = 1; i <= str_a.length; i++) {
  for (let j = 1; j <= str_b.length; j++) {
    if (str_a.charAt(i - 1) === str_b.charAt(j - 1)) {
      d[i][j] = d[i - 1][j - 1];
      //i-1, j-1인 이유는 공집합을 포함하므로 현재 i, j에서 1을 빼주어야함. 그래야 올바르게 str_a의 i번쨰에 접근할 수 있음
    } else {
      d[i][j] = Math.min(d[i - 1][j - 1], d[i - 1][j], d[i][j - 1]) + 1;
    }
  }
}


//4
const answer = d[str_a.length][str_b.length];
```

# DFS 알고리즘

깊이 우선 탐색으로 스택 자료 구조를 사용한다. 스택 자료 구조는 FIFO 자료 구조로 맨 위에 있는 것 부터 뺀다. 위에 있는 것은 더 리프 노드 쪽일 것이고, 리프 노드를 또 스택에 추가한다. 방문한 곳은 방문하지 않으므로 점점 더 리프 노드쪽으로 탐색하게 된다.

```
const graph = [[1], [2, 3, 0], [1, 3, 4], [1, 4, 5], [2, 3], [3, 6, 7], [5, 8], [5], [6]];
const visited = Array(graph.length).fill(false);
function dfs(graph, visited, node) {
  visited[node] = true;
  console.log(node);
  graph[node].forEach((v) => {
    if (!visited[v]) dfs(graph, visited, v);
  });
}

dfs(graph, visited, 0);

```

# BFS 알고리즘

넓이 우선 탐색 알고리즘이다. 큐를 이용하기 때문에 한 뎁스씩 추가해가며 리프 노드에 가까워진다. 노드간의 거리가 1일 때 최단 거리를 구하기 위해 주로 사용된다. 그리고 주의해야 하는 점은 큐에 넣고 나서 바로 방문 처리 해주어야 한다는 것이다. 큐에 넣고 방문처리 안해주면 또 같은 노드가 큐에 들어가는 불상사가 발생할 수 있다.

## 최단거리와 BFS

### 왜 DFS가 아닌, BFS가 사용되는 이유에 대해서

DFS를 사용해도 최단 거리를 구할 수는 있다. 다만 각 노드에 대해서 자신이 갈 수 있는 간선의 길이만큼 제곱수로 재귀를 수행하게 된다. 만약에 0이라는 노드가 1,2,3 이라는 노드를 갈 수 있을 때 3개의 분기점이 생긴다. 또 이동한 노드에 대해서 분기점이 생길 때마다 매 분기점에 대해서 곱한 경우의 수가 탄생하게 된다. 즉 너무나도 많은 경로를 탐색해봐야 한다. 하지만 BFS는 간선의 길이만큼만 탐색해보면 최단거리를 구할 수 있다.

### 길이가 1이 아니라면 다익스트라를 사용하는 이유

방문한 노드를 또 방문하지 않기 때문이다. 즉 depth가 최단 거리를 나타내는데 가중치가 있다면 depth가 최단 거리를 나타내지 않는다.
길이가 다르다면 다익스트라 알고리즘을 사용해서, 더 빨리 갈 수 있는 길이 있는지 확인해야한다.

```
const graph = [[1], [2, 3, 0], [1, 3, 4], [1, 4, 5], [2, 3], [3, 6, 7], [5, 8], [5], [6]];
const visited = Array(graph.length).fill(false);

function bfs(graph, visited, node) {
  const queue = new Queue();
  queue.enqueue(node);
  visited[node] = true;

  while (queue.size() > 0) {
    const d_node = queue.dequeue();
    console.log(d_node);

    graph[d_node].forEach((v) => {
      if (!visited[v]) queue.enqueue(v);
      visited[v] = true;
    });
  }
}

bfs(graph, visited, 0);
```

# 다익스트라 알고리즘

경로에 가중치가 있을 때, 한 노드에서 다른 노드의 최단 거리를 알 수 있는 알고리즘이다. 물론 가중치가 없을 때도 사용해도 되긴 하다.

1. 노드 개수+1의 1차원 배열을 만든다. 초기값은 무한대이다. (0번 노드를 없는 것으로 처리 하므로 +1해준다.)
2. 배열의 시작 노드 위치를 0으로 만든다.
3. 모든 위치를 방문할 때까지 while문을 돌려준다. 방문하지 않은 노드들 중에서 최단거리인 노드를 방문한다.
4. 노드가 갈 수 있는 간선들에 대해서, 자기 자신을 거쳐서 가는 길이에 대해서 최솟값으로 갱신해준다.
5. while문이 끝난다. 최단 거리를 출력한다.

3의 과정 중 방문하지 않는 노드들 중에서 최단거리인 노드를 뽑을 때 힙을 이용할수도 있다. 힙을 이용하면 큐가 빌 때 까지 while문을 돌리면 된다.

### 힙을 사용하지 않은 방식.

```
function findNode(d, visited) {
  let index = 0;
  let min = Infinity;

  for (let i = 0; i < d.length; i++) {
    if (!visited[i]) {
      min = Math.min(min, d[i]);
      if (min === d[i]) index = i;
    }
  }
  return index;
}

function dijkstra(n, graph, start) {
  const d = Array(n + 1).fill(Infinity);
  const visited = Array(n + 1).fill(false);
  visited[0] = true;
  d[start] = 0;

  while (!visited.every((v) => v)) {
    const node = findNode(d, visited);
    visited[node] = true;

    graph[node].forEach(([arrive, cost]) => {
      d[arrive] = Math.min(d[arrive], d[node] + cost);
    });
  }
  console.log(d);
}
```

### 힙을 사용한 방식

가장 짧은 길이를 알기 위해서 나의 현재 길이도 같이 넣어준다. 만일 dequeue된 요소의 최소 길이가 현재 테이블의 길이보다 길다면 이는 무시하면 된다. 이미 처리된 노드이기 때문이다. 해당 노드에서 접근할 수 있는 부분을 접근한 후에, 최솟값이면 큐에 넣어준다.

```
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

let fs = require("fs");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");
const [n, m] = input.shift().split(" ").map(Number);

const graph = Array(n + 1)
  .fill()
  .map((_) => []);
const startNode = +input.shift();
for (let i = 0; i < m; i++) {
  const [start, end, cost] = input.shift().split(" ").map(Number);
  graph[start].push([end, cost]);
}

function dijkstra(n, graph, start) {
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
  console.log(d);
}

dijkstra(n, graph, startNode);

```

# 플로이드 워셜 알고리즘

플로이드 워셜은 다익스트라 알고리즘과 다르게 모든 노드에서 모든 노드로 가는 길이의 최단 거리를 구할 수 있다.

1. 노드의 길이만큼의 이차원 배열을 생성하고 초기값은 무한대를 넣어준다.
2. 동일 노드에서 동일 노드로 가는 길이를 0으로 초기화 해준다.
3. 간선의 정보를 전부 넣어준다. (최솟값으로 갱신시켜주면서)
4. 모든 노드가 갈 수 있는 길에 대해서, 노드 n을 거쳐서 지나갈 때 길이가 짧다면 최솟값을 갱신해준다.

```
let fs = require("fs");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");
const [n, m] = input.shift().split(" ").map(Number);

const graph = Array(n + 1)
  .fill()
  .map((_) => []);

for (let i = 0; i < m; i++) {
  const [start, end, cost] = input.shift().split(" ").map(Number);
  graph[start].push([end, cost]);
}

function floydWarshall(n, graph) {
  const distance = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));

  for (let i = 1; i <= n; i++) {
    distance[i][i] = 0;
  }

  graph.forEach((arr, i) => {
    arr.forEach((v) => {
      const [end, cost] = v;
      distance[i][end] = Math.min(distance[i][end], cost);
    });
  });

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }
  console.log(distance);
}

floydWarshall(n, graph);
```

# 누적합 알고리즘

배열 전체에 여러번 연산 처리를 해줘야 할 때가 있다. 누적합 알고리즘은 한번의 루프만으로 연산 처리를 해준다.
길이가 n인 배열이 있을 때 1부터 n-1까지 루프를 돌면서 전의 값을 더해준다.

```
for(let i=1; i<=n-1; i++){
    arr[i] = arr[i-1]
}
```

더하고 뺄 구간에 마킹을 해놓고 누적합을 통해서 한번에 연산할 수 있다.

# 구간합 알고리즘

누적합 알고리즘을 사용한다. 수열 내 연속하는 구간의 합을 빠르게 알 수 있다.
누적합을 적용한 배열을 만든다. 만일 배열의 길이가 5라면, 3부터 5까지의 길이를 구하기 위해서는 `arr[5]-arr[2]`를 해주면 된다. 왜냐면 5의 의미는 1+2+3+4+5 이고, 2의 의미는 1+2 이므로, 이 둘을 빼면 3+4+5를 얻게 된다.

# 서로소 알고리즘

서로소 알고리즘은 노드끼리 관계가 있는지 판별하는 알고리즘이다.
각 노드의 루트 노드를 찾는다. 만일 각 노드의 루트 노드가 일치하면 두 노드는 서로 연결되어 있는 것이다.

1. parent를 정의한다. 노드 자기 자신을 값으로 갖는다.
2. findParent 연산을 정의한다. 자신의 루트 노드를 찾는 기능을 수행한다. 루트 노드란, 노드와 값이 일치하면 루트 노드이다. 루트 노드를 찾을 떄 까지 재귀적으로 수행한다.
3. union 연산을 정의한다. union 연산은 집합을 합치는 연산이다. 둘의 루트 노드 찾고, 더 작은 노드에 큰 노드를 연결한다.

```
const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
};

const union = (parent, a, b) => {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a > b) {
    parent[a] = b;
  } else {
    parent[b] = a;
  }
};

const edges = [[1, 2]];

function disjoint(n, edges) {
  //n은 노드의 개수
  const parent = Array(n + 1)
    .fill()
    .map((_, i) => i);

  edges.forEach((el) => {
    const [a, b] = el;
    union(parent, a, b);
  });

  for (let i = 1; i <= n; i++) {
    console.log(findParent(parent, i));
  }
}

disjoint(5, edges);
```

## 사이클 판별

간선에서 루프를 돌면서 union 함수를 시행할 때, a와 b의 루트 노드가 같다면 사이클이 발생한 것이다.

# 크루스칼 알고리즘

최소 신장 트리를 만족하면서, 최소 신장 트리의 모든 간선의 길이가 최소로 만드는 것이다.
간선의 길이를 오름차순 기준으로 정렬하고, 하나씩 간선을 놓는다. 만약 간선을 놓는데 사이클이 발생한다면 놓지 않는다. 사이클이 발생했는데 놓게 되면 최소 신장 트리가 아니기 때문이다.

```
const edges = [
  [1, 7, 12],
  [1, 4, 28],
  [1, 2, 67],
  [1, 5, 17],
  [2, 4, 24],
  [2, 5, 62],
  [3, 5, 20],
  [3, 6, 37],
  [4, 7, 13],
  [5, 6, 45],
  [5, 7, 73],
];

//edges 길이 오름차순 기준으로 정렬
edges.sort((a, b) => a[2] - b[2]);

const n = 7;

const parent = Array(n + 1)
  .fill()
  .map((_, i) => i);

const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
};

const union = (parent, a, b) => {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a === b) return true;
  //사이클이 발생한다면 수행하지 않음.
  if (a > b) {
    parent[a] = b;
  } else {
    parent[b] = a;
  }
  return false;
};
let sum = 0;
edges.forEach(([start, end, cost]) => {
  const cycle = union(parent, start, end);
  if (!cycle) sum += cost;
});
console.log(sum);

```

# 위상 정렬

위상 정렬은 커리큘럼과 같이 순서를 알고 싶을 때 사용된다. 하나의 순서에 여러개의 값이 들어갈 수 있으므로 여러개의 결과값이 도출될 수 있다.

1. 노드의 개수+1의 길이를 가지는 indegree 배열을 만든다.
2. 도착 노드의 indegree를 1을 더해준다.
3. indegree 배열 중에서 0인 (출발점)을 큐에 넣는다.
4. dequeue를 하고 도착 노드의 indegree를 1을 빼준다. 만일 indegree가 0이 되었다면 큐에 삽입한다.
5. 큐가 빌 때 까지 반복한다.

## 위상 정렬이 성립하지 않을 때

전부 수행하고 나서 indegree가 양수인 노드가 있을 때 위상 정렬이 성립하지 않는다. 즉 사이클이 발생했다.

```
const edges = [
  [1, 2],
  [1, 5],
  [2, 3],
  [3, 4],
  [4, 6],
  [5, 6],
  [6, 7],
];

const n = 7;

const graph = Array(n + 1)
  .fill()
  .map((_) => []);
const indegree = Array(n + 1).fill(0);

edges.forEach(([start, end]) => {
  graph[start].push(end);
  indegree[end] += 1;
});
const queue = new Queue();
for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) queue.enqueue(i);
}

while (queue.size() > 0) {
  const node = queue.dequeue();
  console.log(node);
  graph[node].forEach((v) => {
    indegree[v] -= 1;
    if (indegree[v] === 0) queue.enqueue(v);
  });
}
```

# 최대 공약수, 최소 공배수 알고리즘

## 최대 공약수(유클리드 호제법)

```
function getGCD(a,b){
    if(b === 0) return a
    return getGCD(b, a%b)
}
```

## 최소 공배수

`a*b/gcd(a,b)`이다.
a = AR, b= BR 이라고 가정해본다면(R는 최대공약수) a\*b = ABR^2가 된다. 여기서 R을 나눠주면 ABR이 되고 이는 최소공배수이다.

# 이진탐색 알고리즘

logN의 시간으로 탐색할 수 있다. 정렬되어 있어야만 쓸 수 있다.

## while문을 이용한 방식

```
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) return mid;

    if (arr[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return "none";
}
```

## 재귀를 이용한 방식

```
function binarySearch2(arr, target, start, end) {
  if (start > end) return "none";

  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === target) return mid;

  if (arr[mid] < target) return binarySearch2(arr, target, mid + 1, end);
  else return binarySearch2(arr, target, start, mid - 1);
}
```

# 이진탐색 lower-bound, upper-bound 알고리즘

## upper-bound

계속 오른쪽으로 가야한다. 내가 찾고자 하는 값이 `arr[mid]`와 같을 때 오른쪽으로 계속 가줘야한다. 따라서 `start = mid+1`을 해주면 된다. 이렇게 계속 가다가 마지막 타겟값을 넘기게 된다. 그러면 end가 target의 위치로 오게되고 루프가 끝나게된다. 그래서 start에 -1을 해준 값이 타겟값을 만족하는 마지막 요소이다.

```
function upperBound(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] <= target) start = mid + 1;
    else end = mid - 1;
  }
  return start - 1;
}
```

## lower-bound

계속 왼쪽으로 가야한다. 내가 찾고자 하는 값이 `arr[mid]`와 같을 때 왼쪽으로 가줘야 한다. 따라서 `end=mid-1`을 해주면 된다. 이렇게 계속 가다가 end가 마지막 타겟값 앞으로 가게 된다. 이 때 start는 계속 조정하면서 결국 target값까지 도달하게 되고 루프가 종료된다. 따라서 end+1을 리턴해줘야 한다.

```
function lowerBound(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) end = mid - 1;
    else start = mid + 1;
  }
  return end + 1;
}
```

# 조합 알고리즘

arr에서 n개를 뽑는 경우의 수를 가진다. attached를 만들 때 n-1개를 뽑는 경우의 수에 본인 요소를 붙여줘야 한다는 것을 잊지말자.

```
function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

```

# 순열 알고리즘

조합 알고리즘에서 rest를 구하는 부분만 다르다. 본인 요소를 제외한 나머지 요소가 들어갈 수 있다.

```
function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.filter((_, index) => index !== i);
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}
```

# 기타 스킬

## split 한번만 하기.

split 할 글자가 `=` 라고 한다면

```
const str = "JDDDSS=dddddd ddt=ddd dddw=qqw";
const temp = str.split("=")
const s1 = temp[0]
const s2 = temp.slice(1).join("=")
```

반복문은 왠만하면 map,reduce, filter 등 함수형으로 작성할 것.

## match

match는 정규식을 인자로 받는데, g 플래그가 없다면 해당 스트링의 첫 번째 정보를 가져온다. g플래그를 넣으면 일치하는 문자열을 전부 배열로 받아온다.

```
const str = "JDDDSS=dddddd ddt=ddd dddw=qqw";
const match1 = str.match(/=/)
//match1 결과: input 블라블라,, 등등 정보가 들어있고 가장 중요한 index가 들어있다.
const match2 = str.match(/=/g)
//match2 결과:["=","=","="]
```

# 정규식

### gmi

g: globally 전부 다 찾아라, m:개행이 된 것을 포함해서 찾아라, i:대소문자 무시해라.

### 범위로 찾기.

[0-9], [a-z] 아스키 코드 값이라서 앞에 값이 더 적어야한다.
[A-Za-z]
[0-9A-Za-z]
범위로 찾기 내에서 ^가 있으면 not을 의미한다.

"또는"의 의미로도 해석될 수 있다. [-aA]: 하이픈, 소문자a, 대문자 A를 찾아라.

\s : 띄어쓰기를 의미함.
\w : [0-9A-Za-z_]를 의미함.
\d : 숫자
\D : 숫자가 아닌 것.

\+ : 무조건 한 글자 이상 와야함. ex) ^[a-z]+[0-9] -> a-z로 시작하는 글자가 한글자 무조건 와야함.

\* : 0개 이상 (있어도 되고 없어도 되고)
? : 1글자 또는 0글자. (2글자 안됨.)

^는 시작 $는 끝.

{2,3} : 2글자에서 3글자 까지
{2} : 2글자 이상
{,3} : 3글자 이하

특수문자 문자 그대로: 역슬래쉬 넣어주면 된다. \. \[ \]

(): 그룹 만들기, 굳이 그룹으로 안만들고 대괄호를 이용하면 된다 사실.
| : 또는

## 정규식이 사용되는 메소드

1. match ("문자열").match(/정규표현식/플래그)
2. replace ("문자열").replace(/정규표현식/플래그, 대체텍스트) 만일 정규 표현식에 만족하는 문자 전부를 교체하고 싶다면 플래그에 g 넣어줘야함.
3. split ("문자열").split(/정규표현식/플래그) 정규 표현식에 매칭되는 항목으로 쪼개서 배열로 변환
4. (정규표현식).test("문자열")
5. (정규표현식).exec("문자열") match와 유사하나 첫 번째 결과물만 반환한다.
