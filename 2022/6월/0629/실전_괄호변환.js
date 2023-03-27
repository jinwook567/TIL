class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
  }

  enqueue(data) {
    this.queue[this.rear++] = data;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

function solution(p) {
  function devide(str) {
    let left = 0;
    let right = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "(") {
        left++;
      } else {
        right++;
      }

      if (left === right) return [str.slice(0, i + 1), str.slice(i + 1)];
    }
  }

  const r = devide("(())");
  console.log({ r });

  function check(str) {
    const queue = new Queue();

    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "(") {
        queue.enqueue("(");
      } else {
        const dequeued = queue.dequeue();
        if (!dequeued) return false;
      }
    }
    return true;
    //무조건 균형잡힌 문자열이기 때문에, dequeue의 값이 undefined라면 false
    //dequeue값이
  }

  function dfs(str) {
    if (str.length === 0) return "";
    const [u, v] = devide(str);
    //u가 올바른 문자열이라면 v를 재귀적으로 실행.
    if (!check(u)) {
      let newStr = "(";
      const result = dfs(v);
      newStr += result;
      newStr += ")";
      let nu = u.slice(1, u.length - 1);

      nu = [...nu].map((v) => (v === "(" ? ")" : "(")).join("");
      newStr += nu;
      return newStr;
    } else {
      return u + dfs(v);
    }
  }
  return dfs(p);
}

const str = ")(";
const r = solution(str);
console.log(r);
