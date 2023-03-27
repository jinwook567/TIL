//동일한 요소 내 첫 부분 리턴해야함.
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end + 1;
}

//본인일 때 까지 계속 찾아라.
function move(k, parent, direction) {
  while (true) {
    if (direction === "U") k--;
    else k++;
    const index = binarySearch(parent, k);
    if (index === parent[index] && k === index) return index;
  }
}

//graph 이론, 이진 탐색으로 구현해보기.
function solution(n, k, cmd) {
  const parent = Array(n)
    .fill()
    .map((_, i) => i);

  const stack = [];

  cmd.forEach((el) => {
    const command = el.split(" ")[0];
    if (command === "U" || command === "D") {
      for (let i = 0; i < +el.split(" ")[1]; i++) {
        k = move(k, parent, command);
      }
    } else {
      if (command === "C") {
        stack.push(k);
        parent[k] = k - 1;
        if (k === n - 1) k = k - 1;
        else k = k + 1;
      } else {
        const last = stack.pop();
        parent[last] = last;
      }
    }
  });
  return parent.map((v, i) => (v === i ? "O" : "X")).join("");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"];
const r = solution(n, k, cmd);
console.log(r);
