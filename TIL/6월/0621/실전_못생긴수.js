function solution(num) {
  let i = 0;
  const set = new Set();
  set.add(1);
  let d = [1];

  while (set.size < num + 3) {
    set.add(d[i] * 2);
    set.add(d[i] * 3);
    set.add(d[i] * 5);
    d = [...set];
    i++;
  }
  d.sort((x, y) => x - y);
  console.log(d);
  return d[num - 1];
}

//const r = solution(4);
//언제까지 시행하는지에 대해서...

//기본적인 접근은 맞았다. min을 이용하면 딱 알맞게 할 수 있다..
function solution2(num) {
  const d = Array(num).fill(0);
  d[0] = 1;

  let [i2, i3, i5] = [0, 0, 0];
  let [next2, next3, next5] = [2, 3, 5];

  for (let i = 1; i < num; i++) {
    d[i] = Math.min(next2, next3, next5);

    if (d[i] === next2) {
      i2++;
      next2 = d[i2] * 2;
    }

    if (d[i] === next3) {
      i3++;
      next3 = d[i3] * 3;
    }

    if (d[i] === next5) {
      i5++;
      next5 = d[i5] * 5;
    }
    //if, elseif, else문으로 하면 1번 밖에 조건문을 통과하지 않아서, 중복되는 수가 변경이 안되지만 if문을 3번 반복하게 되면 중복되는 index가 더해져서 이런 문제가 해결된다.
  }

  console.log(d);
}
solution2(10);
