class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

function solution(nodeinfo) {
  //nodeinfo = nodeinfo.map((el, index) => ({ y: el[1], x: el[0], node: index + 1 }));

  const depth = nodeinfo.reduce((acc, cur) => Math.max(acc, cur[1]), 0);

  const graph = Array(depth + 1)
    .fill()
    .map(() => []);

  nodeinfo.forEach((el, index) => {
    graph[el[1]].push({ x: el[0], node: index + 1 });
  });

  let root = null;

  for (let i = graph.length - 1; i >= 0; i--) {
    //y값이 큰 것 순서대로이다. 그러니까 위로 올라갈 일은 없는 것이다.
    if (!root) {
      const node = new Node(graph[i][0]);
      //0번째 원소를 넣어줘야한다.
      root = node;
      continue;
    }
    for (let j = 0; j < graph[i].length; j++) {
      let current = root;

      while (true) {
        if (current.data.x < graph[i][j].x) {
          if (!current.right) {
            current.right = new Node(graph[i][j]);
            break;
          } else {
            current = current.right;
          }
        } else {
          //현재의 값보다 작다. (왼쪽)
          if (!current.left) {
            current.left = new Node(graph[i][j]);
            break;
          } else {
            current = current.left;
          }
        }
      }
    }
  }

  const inorderResult = [];
  function inorder(node) {
    if (node) {
      inorderResult.push(node.data.node);
      inorder(node.left);
      inorder(node.right);
    }
  }
  inorder(root);

  const preorderResult = [];
  function preorder(node) {
    if (node) {
      preorder(node.left);
      preorder(node.right);
      preorderResult.push(node.data.node);
    }
  }
  preorder(root);
  return [inorderResult, preorderResult];
}

const nodeinfo = [
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2],
];
const r = solution(nodeinfo);
console.log(r);
