function solution(n, build_frame) {
  //놓아 본 다음에 가능한지 안 가능한지 판단하라.
  //전체 모양 탐색. (문제가 있는지 없는지) 만약 문제가 있다면 다시 되돌려야함. 삭제라면 다시 복구, 놓기라면 삭제.

  let building = [];

  function check(building) {
    const copy = [...building];
    //copy 다이나믹 프로그래밍과 유사하다..

    while (copy.length !== 0) {
      const [x, y, a] = copy.pop();

      if (a === 0) {
        //기둥
        //바닥 위에도 없고, 보의 한쪽 끝부분 위에도 없고, 또 다른 기둥 위에도 없고
        const colums = building.filter((v) => v[2] === 0 && v[1] === y - 1 && v[0] === x);
        const rows = building.filter(
          (v) => v[2] === 1 && v[1] === y && (v[1] === x || v[1] === x - 1)
        );
        if (y !== 0 && colums.length === 0 && rows.length === 0) return false;
        if (y >= n || y < 0) return false;
      } else {
        //보
        const colums = building.filter((v) => v[2] === 0 && v[1] === y - 1 && v[0] === x);
        const colums2 = building.filter((v) => v[2] === 0 && v[1] === y - 1 && v[0] === x + 1);
        //double row
        const rows2 = building.filter((v) => v[2] === 1 && v[1] === y && v[0] === x + 1);
        const row1 = building.filter((v) => v[2] === 1 && v[1] === y && v[0] === x - 1);
        //row2, row1이 동시에 있어야함.
        if (
          !(colums.length !== 0 || colums2.length !== 0) &&
          !(rows2.length !== 0 && row1.length !== 0)
        )
          return false;
        if (x < 0 || x >= n) return false;
      }
    }
    return true;
  }

  for (let i = 0; i < build_frame.length; i++) {
    const [x, y, a, b] = build_frame[i];

    if (b === 0) {
      //삭제
      building = building.filter((v) => !(v[0] === x && v[1] === y && v[2] === a));
      if (!check(building)) {
        building.push([x, y, a]);
      }
    } else {
      building.push([x, y, a]);
      if (!check(building)) {
        building.pop();
      }
      //설치
    }
  }

  building.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  return building;
  //push, pop..
}

const r = solution(5, [
  [1, 0, 0, 1],
  [1, 1, 1, 1],
  [2, 1, 0, 1],
  [2, 2, 1, 1],
  [5, 0, 0, 1],
  [5, 1, 0, 1],
  [4, 2, 1, 1],
  [3, 2, 1, 1],
]);

console.log(r);
