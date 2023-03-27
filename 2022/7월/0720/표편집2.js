//value is index
//doubly linked list로 구현해야하네.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  //전과 후가 정확히 해당 node인지 어떻게 알지?
  insert(node) {
    const prevNode = node.previous;
    const nextNode = node.next;

    if (prevNode) {
      prevNode.next = node;
    }
    if (nextNode) {
      node.next = nextNode;
    }
  }

  remove(node) {
    const nextNode = node.next;
    const prevNode = node.previous;

    if (prevNode && nextNode) {
      nextNode.previous = prevNode;
      prevNode.next = nextNode;
    } else if (prevNode) {
      prevNode.next = null;
    } else if (next) {
      next.previous = null;
    }
  }

  move_down(node) {
    return node.next;
  }

  move_up(node) {
    return node.previous;
  }

  getValue() {
    let currentNode = this.head;
    const value = [];
    while (true) {
      if (!currentNode) break;
      value.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return value;
  }
  //insert 앞에 들어가야 할 node를 탐색해야함.
}

function solution(n, k, cmd) {
  const linkedList = new LinkedList();
  for (let i = 0; i < n; i++) {
    linkedList.append(i);
  }

  let currentNode = linkedList.head;
  for (let i = 0; i < k; i++) {
    currentNode = linkedList.move_down(currentNode);
  }

  const stack = [];

  cmd.forEach((c, index) => {
    const split = c.split(" ");
    if (split[0] === "D" || split[0] === "U") {
      for (let i = 0; i < +split[1]; i++) {
        if (split[0] === "D") {
          currentNode = currentNode.next;
        } else {
          currentNode = currentNode.previous;
        }
      }
    } else {
      if (split[0] === "C") {
        stack.push(currentNode);
        linkedList.remove(currentNode);
        if (currentNode.next) {
          currentNode = currentNode.next;
        } else {
          currentNode = currentNode.previous;
        }
      } else {
        const last = stack.pop();
        linkedList.insert(last);
      }
    }
  });

  const table = Array(n).fill("X");
  linkedList.getValue().forEach((v) => (table[v] = "O"));
  return table.join("");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z", "U 1", "C"];
const r = solution(n, k, cmd);
console.log(r);
