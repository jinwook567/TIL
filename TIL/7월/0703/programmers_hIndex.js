const citations = [3, 0, 6, 1, 5];

//sort해서 푸는 방법도 생각해보자..
function solution(citations) {
  let answer = 0;
  const len = citations.length;

  for (let i = 0; i <= 10000; i++) {
    const higher = citations.filter((v) => v >= i);
    if (higher.length >= i && len - higher.length <= i) answer = i;
  }

  return answer;
}

const r = solution(citations);
console.log(r);
