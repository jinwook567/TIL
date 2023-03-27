function solution(example) {
  let count = 0;
  for (let i = 0; i <= example; i++) {
    for (let j = 0; j < 60; j++) {
      for (let k = 0; k < 60; k++) {
        const a = String(i);
        const b = String(j);
        const c = String(k);
        if (a.includes("3") || b.includes("3") || c.includes("3")) count++;
        //3이 포함되면..
      }
    }
  }
  console.log(count);
}

solution(5);
