function solution2(food_times, k) {
  //센스있는 문풀이 아닌, 노가다성으로 문제를 한번 풀어보자. 아마 효율성테스트에서 막힐 것 같지만.
  //효율성 테스트에서 그냥 막혀버렸다.
  let i = 0;
  let time = 0;
  while (true) {
    if (food_times[i] > 0) {
      food_times[i] -= 1;
      time += 1;
    }
    i += 1;
    if (i === food_times.length) i = 0;
    if (time === k) break;
  }
  return food_times[i] === 0 ? -1 : i + 1;
}

function solution3(food_times, k) {
  //런타임 에러나고 정확도에서 일부 에러남.
  food_times = food_times.map((time, i) => ({ index: i, time }));
  const getMiniumTime = (food_times) => {
    const minium = Math.min(...food_times.map((times) => times.time));
    const index = food_times.findIndex((times) => times.time === minium);
    return { minium, index };
  };

  //배열 입출력은 시간이 오래걸리는데..
  while (true) {
    if (food_times.length === 0) return -1;
    let cycle = food_times.length;
    const { minium, index } = getMiniumTime(food_times);
    if (cycle * minium < k) {
      //minium만큼 전체 숫자 뺀 다음에, 0이 아닌 친구들 filter
      food_times = food_times.map((times) => ({ ...times, time: times.time - minium }));
      food_times = food_times.filter((times) => times.time !== 0);
      k -= cycle * minium;
    } else {
      const availableCycle = Math.floor(k / cycle);
      const i = k % cycle;
      food_times = food_times.map((times) => ({ ...times, time: times.time - availableCycle }));
      food_times.sort((x, y) => x.index - y.index);
      return food_times[i].index + 1;
    }
  }
}

function solution4(food_times, k) {
  food_times = food_times.map((time, i) => ({ index: i, time }));
  food_times.sort((x, y) => x.time - y.time);
  //뺄 수 있는데까지 빼자.

  //몇 개 없앨 수 있는지 파악하기.
  let left = food_times.length;
  let count = 0;

  for (let food_time of food_times) {
    if (left === 0) return -1;
    const deleted = food_times.length - left;
    console.log({ deleted });
    const { time } = food_time;
    if ((time - deleted) * left + count < k) {
      count += left * time;
      left -= 1;
    } else {
      const i = (k - count + 1) % left;

      return food_times[deleted + i].index + 1;
    }
  }
}
