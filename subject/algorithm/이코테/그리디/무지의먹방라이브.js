function solution(food_times, k) {
  let len = food_times.length;
  let eat = 0;
  const sorted = [...food_times].sort((x, y) => x - y);

  for (let i = 0; i < sorted.length; i++) {
    if (len * (sorted[i] - eat) <= k) {
      k -= len * (sorted[i] - eat);
      len--;
      eat = sorted[i];
    } else {
      food_times = food_times.map((time, index) => ({
        time: time - eat,
        index: index + 1,
      }));
      food_times = food_times.filter((data) => data.time > 0);
      return food_times[k % food_times.length].index;
    }
  }

  return -1;
}
