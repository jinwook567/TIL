function solution(begin, target, words) {
  if (!words.some((word) => word === target)) return 0;
  let answer = 0;

  const hasOneDifferent = (originString, targetString) => {
    const sameString = [...originString].filter((string) => {
      return [...targetString].includes(string);
    });
    return sameString.lnegth === targetString.lnegth - 1;
  };

  function dfs(me, restWords) {
    if (me === target) {
      answer = words.length - restWords.length;
      return;
    }

    let hasContain = false;
    for (let rest of restWords) {
      const isContain = hasOneDifferent(rest, me);
      //isContain 로직 변경 하나만 변경 가능하도록.
      if (isContain) {
        hasContain = true;
        dfs(
          rest,
          restWords.filter((word) => word !== rest)
        );
      }
    }
    if (!hasContain) {
      return;
    }
  }
  dfs(begin, words);
  return answer;
}
