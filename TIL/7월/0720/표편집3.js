class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

function solution(n, k, cmd) {
  let currentNode = new Node(0);
  let head = currentNode;

  for (let i = 1; i < n; i++) {
    const newNode = new Node(i);
    newNode.previous = currentNode;
    currentNode.next = newNode;
    currentNode = currentNode.next;
  }
  currentNode = head;

  for (let i = 0; i < k; i++) {
    currentNode = currentNode.next;
  }

  const stack = [];

  cmd.forEach((c) => {
    const commands = c.split(" ");
    switch (commands[0]) {
      case "U":
        for (let i = 0; i < +commands[1]; i++) {
          currentNode = currentNode.previous;
        }
        break;

      case "D":
        for (let i = 0; i < +commands[1]; i++) {
          currentNode = currentNode.next;
        }
        break;

      case "C":
        const nextNode = currentNode.next;
        const prevNode = currentNode.previous;
        stack.push(currentNode);

        if (prevNode) prevNode.next = nextNode;
        if (nextNode) nextNode.previous = prevNode;

        if (!nextNode) {
          currentNode = currentNode.previous;
        } else {
          currentNode = currentNode.next;
        }
        break;

      case "Z":
        const node = stack.pop();
        if (node.previous) {
          node.previous.next = node;
        }

        if (node.next) {
          node.next.previous = node;
        }

        break;
    }
  });

  const table = Array(n).fill("O");

  //stack에 있는 값들이 빼진 값들.
  //만일 stack을 활용하지 않는다면, while문으로 처음으로 되돌려야한다.
  stack.forEach((v) => {
    table[v.value] = "X";
  });
  return table.join("");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z", "U 1", "C"];
const r = solution(n, k, cmd);
console.log(r);
