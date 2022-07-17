function check(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) return false;
  }
  return true;
}

function solution(n) {
  //배열을 가지고 있다가 최소면 리턴한다..

  //아에 1개를 빼고 이런 생각은 지금 못하겠다. 그렇다면 지금 상황에서 풀 수 있는대로..
  const initial = Array(n)
    .fill()
    .map((_, i) => n - i);
  const result = [];
  const h = [];

  function recursion(a, b, c, history) {
    if (a.length === 0 && b.length === 0) {
      result.push(history);
      return;
    }

    if (!check(a) || !check(b) || !check(c)) {
      return;
    }
    if (h.find((v) => v === JSON.stringify([a, b, c]))) return;
    h.push(JSON.stringify([a, b, c]));

    //console.log({ a, b, c, history });

    if (a.length !== 0) {
      const ap = a.pop();
      recursion([...a], [...b, ap], [...c], [...history, [1, 2]]);
      recursion([...a], b, [...c, ap], [...history, [1, 3]]);
      a.push(ap);
      //a to b
      //a to c
    }

    if (c.length !== 0) {
      const cp = c.pop();
      recursion([...a, cp], [...b], [...c], [...history, [3, 1]]);
      recursion([...a], [...b, cp], [...c], [...history, [3, 2]]);
      c.push(cp);
      //c to a
      //c to b
    }

    if (b.length !== 0) {
      const bp = b.pop();
      recursion([...a, bp], [...b], [...c], [...history, [2, 1]]);
      recursion([...a], [...b], [...c, bp], [...history, [2, 3]]);
      b.push(bp);
      //b to a
      //b to c
    }
  }

  recursion(initial, [], [], []);
  result.sort((a, b) => a.length - b.length);
  return result[0];
}

n = 15;
const r = solution(2);
console.log(r);

console.log(3 ** 15);
