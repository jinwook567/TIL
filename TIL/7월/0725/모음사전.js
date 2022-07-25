function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr;
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function solution(word) {
  const arr = ["A", "E", "I", "O", "U", ""];
  const permutation = getPermutation(arr, arr.length - 1)
    .map((v) => v.join(""))
    .sort((a, b) => (a > b) - (a < b));

  const set = new Set(permutation);

  const answer = [...set].findIndex((v) => v === word);
  return answer;
}

const word = "I";
const r = solution(word);
console.log(r);
