//조합
function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const c = combination.map((c) => [v, ...c]);
    result.push(...c);
  });
  return result;
}

const r = getCombination([1, 2, 3], 2);
console.log(r);

//순열
function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, i) => {
    const rest = arr.filter((_, index) => index !== i);
    const permutation = getPermutation(rest, n - 1);
    const p = permutation.map((el) => [v, ...el]);
    result.push(...p);
  });
  return result;
}

const r2 = getPermutation([1, 2, 3], 2);
console.log(r2);

//중복 순열
function getDuplicatePermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, i) => {
    const rest = [...arr];
    const combination = getDuplicatePermutation(rest, n - 1);
    const c = combination.map((c) => [v, ...c]);
    result.push(...c);
  });
  return result;
}

const r3 = getDuplicatePermutation([1, 2, 3], 2);

//중복 순열
