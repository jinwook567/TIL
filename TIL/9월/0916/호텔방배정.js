function solution(k, room_number) {
  const map = new Map();

  const find = (num) => {
    if (!map.has(num)) {
      map.set(num, map.get(num) + 1);
      return num;
    }

    const n_num = find(map.get(num));
    map.set(num, n_num + 1);
    return n_num;
  };
}

const k = 10;
const room_number = [1, 3, 4, 1, 3, 1];
const r = solution(k, room_number);
console.log(r);
