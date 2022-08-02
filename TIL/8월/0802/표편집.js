class Node {
  constructor(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

function solution(n, k, cmd) {
  const stack = [];

  const head = new Node(0);

  let before = head;
  for (let i = 1; i < n; i++) {
    const node = new Node(i);
    before.next = node;
    node.prev = before;
    before = node;
  }

  //k위치로 이동
  let current = head;
  for (let i = 0; i < k; i++) {
    current = current.next;
  }

  cmd.forEach((c) => {
    const kind = c.split(" ")[0];
    if (kind === "D" || kind === "U") {
      for (let i = 0; i < +c.split(" ")[1]; i++) {
        if (kind === "D") current = current.next;
        else current = current.prev;
      }
    }

    if (kind === "C") {
      stack.push(current);

      if (current.prev) {
        current.prev.next = current.next;
      }

      if (current.next) {
        current.next.prev = current.prev;
        current = current.next;
      } else {
        current = current.prev;
      }
    }

    if (kind === "Z") {
      const node = stack.pop();
      if (node.prev) {
        node.prev.next = node;
      }
      if (node.next) {
        node.next.prev = node;
      }
    }
  });

  const table = Array(n).fill("X");

  while (current.prev) {
    current = current.prev;
  }

  while (current) {
    table[current.data] = "O";
    current = current.next;
  }
  return table.join("");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"];
const r = solution(n, k, cmd);
console.log(r);
