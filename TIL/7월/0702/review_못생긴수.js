//이 문제에서 중요한 점은 어떻게
function solution(n) {
  const d = Array(n + 1).fill(Infinity);
  d[0] = 1;
  const operation = [2, 3, 5];
  //더 작은 것을 넣어야해.
  for (let i = 1; i <= n; i++) {
    //이전 보다 적은 것에서
    //2,3,5를 전부 곱해보고 그 중 작은 것을.. 효율적이진 않지만.
    for (let j = 0; j < i; j++) {
      //그 값이 또 똑같이 나와서는 안돼.
      //d[i-1]보다는 커야하고, 곱한 값들 중에서는 가장 작아야함.
      for (let num of operation) {
        const a = d[j] * num;
        if (a > d[i - 1]) d[i] = Math.min(d[i], a);
      }
    }
  }
  return d;
}

const r = solution(10);
console.log(r);

function solution2(n) {
  const d = Array(n + 1).fill(0);
  d[0] = 1;

  let i2 = 0;
  let i3 = 0;
  let i5 = 0;
  let [next2, next3, next5] = [2, 3, 5];

  for (let i = 1; i <= n; i++) {
    const l = Math.min(next2, next3, next5);
    d[i] = l;

    if (l === next2) {
      i2++;
      next2 = d[i2] * 2;
    }
    if (l === next3) {
      i3++;
      next3 = d[i3] * 3;
    }
    if (l === next5) {
      i5++;
      next5 = d[i5] * 5;
    }
  }
  console.log(d);
}

const r2 = solution2(10);
console.log({ r2 });
