function solution1_1(num) {
  //Top down method
  const memorization = Array(num + 1).fill(0);
  //최솟값만 넣어주면 되고, 만약 내가 실행되었을 때 앞에 값이 있다면 나는 실행할 필요가 없어.

  function recursion(num, count) {
    if (memorization[num] >= count || memorization[num] === 0) {
      memorization[num] = count;
    } else {
      return;
    }

    if (num === 1) return;
    if (Number.isInteger(num / 5)) recursion(num / 5, count + 1);
    if (Number.isInteger(num / 3)) recursion(num / 3, count + 1);
    if (Number.isInteger(num / 2)) recursion(num / 2, count + 1);
    recursion(num - 1, count + 1);
  }
  recursion(num, 0);
  return memorization[1];
}

function solution1_2(num) {
  //bottom up
  const d = Array(num + 1).fill(0);

  for (let i = 2; i <= num; i++) {
    d[i] = d[i - 1] + 1;
    if (i % 2 === 0) {
      d[i] = Math.min(d[i], d[i / 2] + 1);
      //현재 d[i]가 더 작으면, 그냥 d[i] 유지. 그게 아니라면 이전 count값에 +1
    }
    if (i % 3 === 0) {
      d[i] = Math.min(d[i], d[i / 3] + 1);
    }

    if (i % 5 === 0) {
      d[i] = Math.min(d[i], d[i / 5] + 1);
    }
  }
  return d[num];
}
