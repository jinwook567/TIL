function solution(n, weak, dist) {
  let wall = Array(n).fill(0);
  let friends = 0;

  weak.forEach((v) => {
    wall[v] = 1;
  });

  dist.sort((a, b) => a - b);
  //하나씩 뺴는건 pop으로

  function move(direction, dist, start, wall) {
    const newWall = [...wall];
    for (let j = 0; j <= dist; j++) {
      //마지막 Point까지 가능하므로.
      const index = (start + (direction === "L" ? j : -j)) % n;
      newWall[index] = 0;
    }
    return newWall;
  }

  function checkLeastCount(wall) {
    return wall.reduce((acc, cur) => acc + (cur === 1 ? 1 : 0), 0);
  }

  function getWeakPosition(wall) {
    return wall.map((v, i) => (v === 1 ? i : null)).filter((a) => a !== null);
  }

  //재귀로 한번 해보자.
  let min = "FAIL";

  function getAnswer(wall, dist, popFriendsCount) {
    const newDist = [...dist];
    const maxDist = newDist.pop();
    const weakPoints = getWeakPosition(wall);
    if (checkLeastCount(wall) === 0) {
      if (min === "FAIL") {
        min = popFriendsCount;
      } else {
        if (min > popFriendsCount) {
          min = popFriendsCount;
        }
      }
    }
    if (dist.length === 0) {
      return;
    }

    for (let start of weakPoints) {
      const afterMoveRight = move("R", maxDist, start, wall);
      getAnswer(afterMoveRight, newDist, popFriendsCount + 1);

      const afterMoveLeft = move("L", maxDist, start, wall);
      getAnswer(afterMoveLeft, newDist, popFriendsCount + 1);
    }

    // const list = [];
    // let minCount = Infinity;
    // for (let start of weakPoints) {
    //   const afterMoveLeft = move("L", maxDist, start, wall);
    //   const leastCountLeft = checkLeastCount(afterMoveLeft);

    //   const afterMoveRight = move("R", maxDist, start, wall);
    //   const leastCountRight = checkLeastCount(afterMoveRight);

    //   list.push(afterMoveLeft);
    //   list.push(afterMoveRight);
    //   if (minCount > leastCountLeft) {
    //     minCount = leastCountLeft;
    //   }
    //   if (minCount > leastCountRight) {
    //     minCount = leastCountRight;
    //   }
    // }

    // const minLists = list.filter((arr) => checkLeastCount(arr) === minCount);
    // for (let arr of minLists) {
    //   getAnswer(arr, newDist, popFriendsCount + 1);
    // }
  }

  getAnswer(wall, dist, 0);
  return min === "FAIL" ? -1 : min;
}

const result = solution(12, [1, 5, 6, 10], [1, 2, 3, 4]);
console.log(result);

const result2 = solution(12, [1, 3, 4, 9, 10], [3, 5, 7]);
console.log(result2);

function getDistanceOfWeakPoints(wall) {
  const weakPoints = getWeakPosition(wall);

  let rightDistance = 0;
  let rightTemp = 0;
  let leftDistance = 0;
  let leftTemp = 0;

  for (let i = 0, j = 0; j < weakPoints.length; i++) {
    const index = i % wall.length;
    if (wall[index] === 1) {
      j++;
      rightDistance += rightTemp;
      rightTemp = 1;
    } else {
      if (rightTemp > 0) rightTemp++;
    }
  }

  for (let i = 0, j = 0; j < weakPoints.length; i++) {
    const index = Math.abs(wall.length - i) % wall.length;
    if (wall[index] === 1) {
      j++;
      leftDistance += leftTemp;
      leftTemp = 1;
    } else {
      if (leftTemp > 0) leftTemp++;
    }
  }

  return Math.min(rightDistance, leftDistance);
}

function backup() {
  while (dist.length !== 0) {
    const maxDist = dist.pop();
    friends++;
    const weakPoints = getWeakPosition(wall);
    console.log({ maxDist, weakPoints });

    const list = [];
    let minCount = Infinity;
    for (let start of weakPoints) {
      //   console.log(wall);
      // 적은 것을 찾아나가지 말고 그냥 다 떄려박아.

      const afterMoveLeft = move("L", maxDist, start, wall);
      const leastCountLeft = checkLeastCount(afterMoveLeft);

      const afterMoveRight = move("R", maxDist, start, wall);
      const leastCountRight = checkLeastCount(afterMoveRight);

      if (leastCountLeft === 0 || leastCountRight === 0) return friends;

      list.push(afterMoveLeft);
      list.push(afterMoveRight);
      if (minCount > leastCountLeft) {
        minCount = leastCountLeft;
      }
      if (minCount > leastCountRight) {
        minCount = leastCountRight;
      }
    }

    const minLists = list.filter((arr) => checkLeastCount(arr) === minCount);

    minLists.sort((a, b) => getDistanceOfWeakPoints(a) - getDistanceOfWeakPoints(b));
    wall = minLists[0];
  }
}
