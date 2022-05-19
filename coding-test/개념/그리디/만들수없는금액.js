function solution(numbers) {
  const nums = [...numbers].map((v) => Number(v));
  let canMake = 0;
  nums.sort((x, y) => x - y);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] - canMake >= 2) {
      break;
    }
    canMake += nums[i];
  }

  return canMake + 1;
}

console.log(solution("1235"));

//완전 초기에 문제에 대한 접근을 어떻게 해야하는가에 대해서.. 사실 접근법만 알면 거의 다 끝난거니까.
