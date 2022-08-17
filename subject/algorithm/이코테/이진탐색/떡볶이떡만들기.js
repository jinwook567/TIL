function solution(arr, request) {
  //request는 요청한 떡의 길이.
  //arr은 떡의 길이가 담긴 배열.

  function getDduckSum(arr, cuttingHeight) {
    return arr
      .map((num) => (num - cuttingHeight > 0 ? num - cuttingHeight : 0))
      .reduce((acc, cur) => acc + cur, 0);
  }

  //절단기 높이가 최대면, 남는 떡 0
  //절단기 높이가 0이면 남는 떡 전부.
  //그 사이에서 남는 떡의 길이가 M보다 큰 상황을 해야한다.
  //하나씩 떡의 길이를 찾으면서 움직이기에는 연산이 너무 크므로, 이진 탐색을 시행한다.
  const cuttingMinDduckLength = getDduckSum(arr, 0);
  let cuttingMaxDduckLength = 0;

  //arr을 만들어나가는 이진탐색..
  let prevHeight = Math.max(...arr);
  let currentHeight = Math.max(...arr) / 2;
  const results = [];

  while (true) {
    const dduckLength = getDduckSum(currentHeight);
    
    if (dduckLength === request) return currentHeight;
    if (dduckLength > request) {
      //실행을 해봐, 더해서,, 그래도 크면 또 실행해야해.
      currentHeight = (currentHeight + prevHeight) / 2;
      prevHeight = currentHeight;
    }
    if (dduckLength < request) {
      currentHeight = currentHeight / 2;
    }
  }
}
