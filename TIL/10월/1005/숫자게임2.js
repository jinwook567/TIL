function solution(A, B) {
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);

  let answer = 0;
  const len = A.length;

  for (let i = 0, j = 0; i < len; i++) {
    if (A[i] < B[j]) {
      j++;
      answer++;
    }
  }
  return answer;
}

const A = [5, 1, 3, 7];
const B = [2, 2, 6, 8];
const r = solution(A, B);
console.log(r);
