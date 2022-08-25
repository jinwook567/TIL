function solution(n, s) {
  if (n > s) return [-1];
  const r = s % n;
  const q = Math.floor(s / n);
  if (r === 0) {
    return Array(n).fill(q);
  } else {
    const array = Array(n - 1).fill(q);
    for (let i = 0; i < r; i++) {
      array[i] += 1;
    }
    return array.sort((a, b) => a - b);
  }
}

//19와 4라고 치면
//4,5가 가장 크겠지..?

//4,4,4,7
//4,5,5,5

//나머지에 대해서 분배를 해줘야하나?
//몇이 모자라냐에 대해서이지?

const r = solution(n, s);
console.log(r);
