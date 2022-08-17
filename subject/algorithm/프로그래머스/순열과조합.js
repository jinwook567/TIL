function getPermutations(arr, selectedNumber) {}

function getCombinations(arr, selectedNumber) {
  //전부 하나씩 돌아야함.
  //나를 제외한 부분에서, n-1개를 뽑아라.
  //n-1개를 뽑을 때 그러면 또 뽑아라. n-1개 제외하고 또 뽑아라.
  //없으면 멈춰라.
  const result = [];

  //요 함수가 반복되어야함. 재귀함수 없이 생각해보자.

  function getCombi(arr, selectedNumber) {
    let i = 0;
    while (true) {
      const first = arr[i];
      const rest = arr.slice(i + 1);
      if (selectedNumber - 1 > rest.length) {
        break;
      }
      i = i + 1;
    }
    //rest에서 또 selectedNumber -1만큼 뽑아.
  }
  getCombi(arr, selectedNumber);
}
getCombinations([1, 2, 3, 4, 5], 2);
