function solution(key, lock) {
  //단순 무식하게 자물쇠의 크기를 3배로 늘린다. 열쇠의 크기는 자물쇠의 크기와 동일하거나 작으므로.
  const lockLen = lock[0].length;
  const keyLen = key[0].length;
  const expanded = Array(lockLen * 3)
    .fill()
    .map(() => Array(lockLen * 3).fill(0));

  //expanded 중간에 값 넣어주기.
  for (let i = 0; i < lockLen; i++) {
    for (let j = 0; j < lockLen; j++) {
      expanded[lockLen + i][lockLen + j] = lock[i][j];
    }
  }

  //해당 되는 부분이 전부 1인지 확인
  function check() {
    for (let i = 0; i < lockLen; i++) {
      for (let j = 0; j < lockLen; j++) {
        if (expanded[lockLen + i][lockLen + j] !== 1) {
          return false;
        }
      }
    }
    return true;
  }

  //난이도 좆같네. 자물쇠 돌리기.
  function turn() {
    const newArr = Array(keyLen)
      .fill()
      .map(() => Array(keyLen).fill(0));
    for (let i = 0; i < keyLen; i++) {
      for (let j = 0; j < keyLen; j++) {
        newArr[i][keyLen - 1 - j] = key[j][i];
      }
    }
    return newArr;
    //맨 왼쪽 열이 맨 처음 행으로 간다.
  }

  for (let i = 0; i <= lockLen * 2; i++) {
    for (let j = 0; j <= lockLen * 2; j++) {
      //4번 회전하면서, turn을 먼저 해야함. 확인하자.
      for (let k = 0; k < 4; k++) {
        key = turn();
        //key 내부 루프를 돌면서 더해줘야함.
        for (let m = 0; m < keyLen; m++) {
          for (let n = 0; n < keyLen; n++) {
            expanded[i + m][j + n] += key[m][n];
          }
        }

        if (check()) {
          return true;
        } else {
          for (let m = 0; m < keyLen; m++) {
            for (let n = 0; n < keyLen; n++) {
              expanded[i + m][j + n] -= key[m][n];
            }
          }
        }
      }
    }
  }
  return false;
}

const key = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 1],
];
const lock = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];
const r = solution(key, lock);
console.log(r);
