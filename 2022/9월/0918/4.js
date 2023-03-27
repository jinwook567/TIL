function getTail(stacks, a) {
  for (let i = 0; i < stacks.length; i++) {
    const index = (a + i) % stacks.length;
    if (stacks[index].length > 0) {
      return stacks[index].shift();
    }
  }
  return null;
}

function solution(n, queries) {
  let tail = null;
  const answer = [];
  const stacks = Array(n + 1)
    .fill()
    .map((_) => []);

  queries.forEach(([a, b]) => {
    if (b >= 1) {
      //push 연산
      if (!tail) tail = b;
      else stacks[a].push(b);
    } else {
      //pop 연산
      if (stacks[a].length === 0) {
        // 스택이 비었으면 tail이 pop되어야한다.
        if (!tail) {
          answer.push(-1);
        } else {
          answer.push(tail);
          const node = getTail(stacks, a);
          tail = node;
        }
      } else {
        answer.push(stacks[a].pop());
      }
    }
  });
  return answer;
}
