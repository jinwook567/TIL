function solution(enter, leave) {
  let enterIndex = 1;
  let leaveIndex = 0;
  const table = Array(enter.length + 1).fill(0);

  let room = [];
  room.push(enter[0]);
  while (leaveIndex !== leave.length) {
    //만일 방 안에 현재 leave가 없다면, 출입을 시킨다.
    while (true) {
      if (room.find((v) => v === leave[leaveIndex])) {
        room = room.filter((v) => v !== leave[leaveIndex]);
        leaveIndex++;
        break;
      } else {
        //기존에 있던 사람들 1씩 더하기.
        room.forEach((v) => table[v]++);
        room.push(enter[enterIndex]);
        table[enter[enterIndex]] = room.length - 1;
        enterIndex++;
      }
    }
  }
  return table.slice(1);
}

const enter = [1, 4, 2, 3];
const leave = [2, 1, 3, 4];
const r = solution(enter, leave);
console.log(r);
