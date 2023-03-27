//서로소 알고리즘
//다시 되살아난다면 그냥 자기 숫자 박아버리면 되고, 바로 한칸씩 띄어가야하니까. 그냥 같은 값으로 만들어버리고, 이진 탐색으로 빠르게 움직여보면서 없으면 하나 더 작은 숫자로 찾고..
//본인 숫자가 아니라면 삭제된 것으로 간주..

//맨 오른쪽에 있는게 살아있는거..
function binarySearch(arr, start, end, target) {
  if (start > end) return "none";

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target && arr[mid + 1] !== target) {
    return mid;
  }

  if (arr[mid] > target) {
    return binarySearch(arr, start, mid - 1, target);
  } else {
    return binarySearch(arr, mid + 1, end, target);
  }
}

function move(parent, k, cnt, direction) {
  //k는 현재 위치
  //이진 탐색으로 찾아.
  //어떻게 한번에 건너뛸 수 있을까? 그래프 이론?

  while (cnt > 0) {
    direction === "U" ? k-- : k++;
    const index = binarySearch(parent, 0, parent.length - 1, k);
    if (k < 20) {
      console.log(index, k);
    }
    if (index !== "none") {
      k = index;
      cnt--;
    }
  }
  return k;
}

function checkIsLast(d, k) {
  for (let i = k; i < d.length; i++) {
    if (d[i] !== "X") return false;
  }
  return true;
}

function solution(n, k, cmd) {
  //전부 절댓값 기준으로 움직여야함.
  const d = Array(n).fill("O");
  const parent = Array(n)
    .fill()
    .map((_, i) => i);
  const stack = [];

  cmd.forEach((el, index) => {
    el = el.split(" ");
    if (el[0] === "D" || el[0] === "U") {
      k = move(parent, k, +el[1], el[0]);
    } else {
      if (el[0] === "C") {
        //C
        d[k] = "X";
        stack.push(k);
        const temp = k;

        if (checkIsLast(d, k)) {
          k = move(parent, k, 1, "U");
          parent[temp] = k;
        } else {
          k = move(parent, k, 1, "D");
          parent[temp] = k;
        }
      } else {
        //Z
        const last = stack.pop();
        parent[last] = last;
        d[last] = "O";
      }
    }
  });

  return d.join("");
}

const n = 8;
const k = 2;
const cmd = ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z", "U 1", "C"];

const r = solution(n, k, cmd);
console.log(r);
