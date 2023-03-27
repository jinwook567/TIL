function getIsExist(set, number) {
  return set.has(number);
}

function solution(k, room_number) {
  const set = new Set();
  //하나씩 올라가는 로직을 효율성.. 개선 해주면 좋을 것 같은데
  return room_number.map((num) => {
    const isExist = getIsExist(set, num);
    if (!isExist) {
      set.add(num);
      return num;
    } else {
      while (getIsExist(set, num)) {
        num++;
      }
      set.add(num);
      return num;
    }
  });
}

const k = 10;
const room_number = [1, 3, 4, 1, 3, 1];
const r = solution(k, room_number);
console.log(r);
