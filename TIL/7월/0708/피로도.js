function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.filter((_, index) => index !== i);
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function solution(k, dungeons) {
  const permutation = getPermutation(dungeons, dungeons.length);
  let max = 0;

  permutation.forEach((dgs) => {
    let t = k;
    let cnt = 0;
    for (let [need, cost] of dgs) {
      if (t >= need) {
        t -= cost;
        cnt++;
      } else {
        break;
      }
    }
    max = Math.max(max, cnt);
  });
  return max;
}

//순열의 원리를 dfs로 녹여서 풀이.
function solution2(k, dungeons) {
  const len = dungeons.length;
  const visited = Array(len).fill(false);
  let answer = 0;

  function dfs(k, visited, cnt) {
    for (let i = 0; i < len; i++) {
      const [need, cost] = dungeons[i];
      if (!visited[i] && k >= need) {
        const newVisited = [...visited];
        newVisited[i] = true;
        dfs(k - cost, newVisited, cnt + 1);
      } else {
        console.log(visited, cnt);
        answer = Math.max(answer, cnt);
      }
    }
  }
  dfs(k, visited, 0);
  return answer;
}
const k = 80;
const dungeons = [
  [80, 20],
  [50, 40],
  [30, 10],
];
const r = solution2(k, dungeons);
console.log({ r });

//던전의 개수가 8개 이하라면, 순열을 사용해서 모든 상황을 확인해보면 된다.
