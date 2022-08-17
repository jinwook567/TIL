function getFilter(arr, index, distance) {
  //index에서 시작해서 거리만큼
  return arr.filter((v, i) => i < index || v > arr[index] + distance);
}

function solution(n, weak, dist) {
  //처음부터 끝까지 하나씩 다 가보면 된다. 한쪽만 고려하면 됨.
  //array를 늘리는 테크닉.
  const len = weak.length;

  weak.forEach((v) => {
    weak.push(v + n);
  });

  //dist의 숫자를 증가시켜 가면서.

  for (let i = 1; i <= dist.length; i++) {
    const permutations = getPermutation(dist, i);
    //순열 중에서 값을 꺼내보면서 각 point마다 전부 돌아봐야함.

    for (let permu of permutations) {
      //map을 여러번 돌리는 건 어떄?

      const list = Array(len)
        .fill()
        .map(() => [...weak]);
      //아래 코드의 문제는 k가 1로 넘어갈 때 또 새로운 배열로 문제를 푼다는 것이다.
      //0번째 넣은 것..
      for (let k = 0; k < permu.length; k++) {
        for (let j = 0; j < len; j++) {
          //몇 개가 들어가?
          const distance = permu[k];
          list[j] = getFilter(list[j], j, distance);
          if (weak.length - list[j].length === len) return i;
        }
      }
    }
  }
  return -1;

  //we only need weak array..
  //만족하는 상황 나오면 i 리턴하고 끝내기.
}

function getPermutation(array, n) {
  const permutationResults = [];

  const permutation = (arr, n, pick) => {
    if (n === 1) {
      arr.forEach((k) => permutationResults.push([...pick, k]));
      return;
    }

    arr.forEach((k, i, origin) => {
      const rest = origin.filter((_, index) => index !== i);
      permutation(rest, n - 1, [...pick, k]);
    });

    //현재의 모든 함수에서 다음 과정을 반복하라..
  };
  permutation(array, n, []);
  return permutationResults;
}
