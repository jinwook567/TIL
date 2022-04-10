function solution(priorities, location) {
  //location은 배열의 인덱스와 동일함.
  //결국에는 이게 어디로 이동했는지 알아야하는데,

  //각각 아이디를 주고 결과를 만들어서 찾는 방식..(좋아보이지는 않음.)
  //sort랑 비슷해. 하지만 sort를 쓸 수는 없어. 각자 다른 값이기 때문에.
  const results = [];
  let data = priorities.map((priority, i) => ({ id: i, priority }));

  while (data.length !== 0) {
    const isArrayHasBiggerPriority = data.find((datum) => datum.priority > data[0].priority);
    const item = data.shift();
    if (isArrayHasBiggerPriority) {
      data.push(item);
    } else {
      results.push(item);
    }
  }

  const answer = results.findIndex((result) => result.id === location) + 1;
  return answer;
}

function refactoring(priorities, location) {
  //어차피 몇 번째인지만 알면 되는거니까, 전체 결과 배열을 알 필요가 없다.
  let list = priorities.map((priority, i) => ({ my: i === location, priority }));

  let count = 0;
  while (true) {
    //find 함수보다 some 함수가 조금 더 적절하다.
    const firstItem = list.shift();
    const hasHigherPriority = list.some((item) => item.priority > firstItem);
    //해당 변수명이 더 좋아보임. is -> has
    if (hasHigherPriority) {
      list.push(firstItem);
    } else {
      count++;
      if (firstItem.my) return count;
    }
  }
}
