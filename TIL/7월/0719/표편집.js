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
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    this.size++;
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const temp = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.previous = temp;
    }
  }

  //전과 후가 정확히 해당 node인지 어떻게 알지?
  insert(value) {
    this.size++;
    const newNode = new Node(value);
    let currentNode = this.head;

    while (currentNode.next.value < value) {
      currentNode = currentNode.next;
    }

    if (currentNode.next) {
      currentNode.next.previous = newNode;
      newNode.next = currentNode.next;
    }

    newNode.previous = currentNode;
    currentNode.next = newNode;
  }

  remove(node) {
    this.size--;
    const nextNode = node.next;
    const previousNode = node.previous;

    previousNode.next = nextNode;

    if (nextNode) {
      nextNode.previous = previousNode;
    }
  }

  move_down(node) {
    return node.next;
  }

  move_up(node) {
    return node.previous;
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

  cmd.forEach((c) => {
    const split = c.split("");
    if (split[0] === "D" || split[0] === "U") {
      for (let i = 0; i < +split[1]; i++) {
        if (split[0] === "D") {
          currentNode = linkedList.move_down(currentNode);
        } else {
          currentNode = linkedList.move_up(currentNode);
        }
      }
    } else {
      if (split[0] === "C") {
        stack.push(currentNode.value);
        linkedList.remove(currentNode);
        currentNode = linkedList.move_down(currentNode);
      } else {
        const last = stack.pop();
        linkedList.insert(last);
      }
    }
  });

  const table = Array(n).fill("X");

  currentNode = linkedList.head;
  console.log(linkedList.size);
  for (let i = 0; i < linkedList.size - 1; i++) {
    currentNode = linkedList.move_down(currentNode);
    const value = currentNode.value;
    console.log(value, i);
    table[value] = "O";
  }
  console.log(table);
  ("OOOOXOOO");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"];
const r = solution(n, k, cmd);
console.log(r);
