//길이가 짝수인 모든 부분 수열을 만들어본다.
//해당 부분 수열이 스타 수열인지 검증한다.
//가장 긴 스타수열의 길이를 알고싶을 뿐

//250000

//시간 복잡도란, 가장 큰..
//O(N/2)
function check(arr) {
  const set = new Set(arr);
  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i] === arr[i + 1]) return false;
  }

  for (let num of set) {
    let flag = true;
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] !== num && arr[i + 1] !== num) {
        flag = false;
        break;
      }
    }

    if (flag) return true;
  }
  return false;
}

function solution(a) {
  const maxSubsequenceNum = a.length % 2 === 0 ? a.length : a.length - 1;
  let answer = 0;

  for (let i = 4; i <= maxSubsequenceNum; i += 2) {}
  return answer;
}

const a = [5, 2, 3, 3, 5, 3];
const r = solution(a);
console.log(r);
