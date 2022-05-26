function turnRight(dimensionalArray) {
  const h = dimensionalArray.length;
  const w = dimensionalArray[0].length;

  const newArr = Array(w)
    .fill()
    .map(() => Array(h).fill(0));

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      newArr[j][h - i - 1] = dimensionalArray[i][j];
      //j가 newArr의 세로.
    }
  }
  return newArr;
}

function check(dimensionalArray, startIndex, arrLength) {
  for (let i = 0; i < dimensionalArray.length; i++) {
    for (let j = 0; j < dimensionalArray.length; j++) {
      if (
        j >= startIndex &&
        i >= startIndex &&
        i < startIndex + arrLength &&
        j < startIndex + arrLength
      ) {
        if (dimensionalArray[i][j] !== 1) return false;
      }
    }
  }

  return true;
}

function solution(key, lock) {
  const keyLen = key.length;
  const lockLen = lock.length;
  const expandedLen = 2 * keyLen + lockLen;

  const expandedLock = [];
  for (let i = 0; i < expandedLen; i++) {
    let layer = [];
    for (let j = 0; j < expandedLen; j++) {
      if (j >= keyLen && j < keyLen + lockLen && i >= keyLen && i < keyLen + lockLen) {
        layer.push(lock[i - keyLen][j - keyLen]);
      } else {
        layer.push(0);
      }
    }
    expandedLock.push(layer);
  }

  for (let a = 0; a < 4; a++) {
    for (let i = 0; i < keyLen + lockLen; i++) {
      for (let j = 0; j < keyLen + lockLen; j++) {
        const copiedLock = JSON.parse(JSON.stringify(expandedLock));
        for (let k = 0; k < keyLen; k++) {
          for (let l = 0; l < keyLen; l++) {
            copiedLock[i + k][j + l] += key[k][l];
          }
        }
        if (check(copiedLock, keyLen, lockLen)) return true;
        //for check..
      }
    }
    key = turnRight(key);
  }

  return false;
}

const result = solution(
  [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ]
);

console.log(result);
