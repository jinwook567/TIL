//백업본
function solution(n, build_frame) {
  let structure = [];
  //{start: [x,y], end: [x,y], kind: 0 || 1}

  for (let [x, y, a, b] of build_frame) {
    //a -> 0 기둥 1 보
    //b -> 0 삭제 1 설치
    if (b === 1) {
      //설치 로직
      const endPoint = structure.find((v) => v.end[0] === x && v.end[1] === y);
      if (a === 0) {
        //기둥
        if (!endPoint && y !== 0) {
          continue;
        }
        structure.push({ start: [x, y], end: [x, y + 1], kind: 0 });
      } else {
        //보
        const endPoint2 = structure.find((v) => v.end[0] === x + 1 && v.end[1] === y);
        const endPoint3 = structure.find(
          (v) => v.start[0] === x + 1 && v.start[1] === y && v.kind === 1
        );

        if (
          (endPoint && endPoint.kind === 0) ||
          (endPoint2 && endPoint2.kind === 0) ||
          (endPoint && endPoint.kind === 1 && endPoint3)
        ) {
          structure.push({ start: [x, y], end: [x + 1, y], kind: 1 });
        }
      }
    } else {
      const block = structure.find((v) => v.start[0] === x && v.start[1] === y && v.kind === a);
      //구조물이 없으면 그냥 넘어가기.

      if (!block) continue;

      if (block.kind === 0) {
        const endConnected = structure.find((v) => v.start[0] === x && v.start[1] === y + 1);
        if (endConnected.kind === 0) continue;
        if (endConnected.kind === 1) {
          const k = structure.find((v) => v.end[0] === x && v.end[1] === y + 1 && v.kind === 1);
          if (!k) continue;
        }
      } else {
        continue;
        const endPoint1 = structure.find((v) => v.end[0] === x && v.end[1] === y);
        const endPoint2 = structure.find((v) => v.start[0] === x + 1 && v.start[1] === y);
        //connected가 보이고, 다음 것도 보이면 가능해.
        if (endPoint1 && endPoint1.kind === 1 && endPoint2 && endPoint2.kind === 1) {
        }
        if (endPoint1 && endPoint1.kind === 0 && !endPoint2) {
        }
        if (!endPoint1 && endPoint2 && endPoint2.kind === 0) {
        }
      }
      structure = structure.filter((v) => !(v.start[0] === x && v.start[1] === y && v.kind === a));
      //삭제 로직
    }
  }

  structure = structure.map((v) => [...v.start, v.kind]);
  structure.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  return structure;
}

//다시 코드
//전체를 확인해야 하는 이유: 한번 만들어놓으면 계속 이용할 수 있으니까. -->> 왜??
//배열로 넣는 것 까지는 완벽했음. 필요한 것도 배열이기 떄문에 해당 부분이 맞음. 잘했다.

function solution(n, build_frame) {
  const structure = new Set();

  //structure내의 모든 상황을 돌면서 넣어보면 되는 것이 아닌가?
  function possible() {
    for (let data of structure) {
      const [x, y, stuff] = Json.parse(data);
      if (stuff === 0) {
        //기둥일 떄
        //바닥 위에 있을 때.
        if (y === 0) continue;
        //보의 한쪽 끝부분 위에 있을 때
        if (structure.has([x - 1, y, 1]) && !structure.has([x, y, 1])) continue;
        //다른 기둥 위에 있을 때.
        if (structure.has([x, y - 1, 0])) continue;
        return false;
      } else {
        //보일 때
        //한쪽 끝부분이 기둥 위에 있을 때.
        if (structure.has([x, y - 1, 0]) || structure.has([x + 1, y - 1, 0])) continue;
        //양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 할 때.
        if (structure.has([x - 1, y, 1]) && structure.has([x - 1, y, 1])) continue;
        return false;
      }
    }
    return true;
  }

  for (let [x, y, a, b] of build_frame) {
    if (b === 1) {
      //설치
      structure.add(JSON.stringify([x, y, a]));
      if (!possible()) {
        structure.delete(JSON.stringify([x, y, a]));
      }
    } else {
      //삭제
      structure.delete(JSON.stringify([x, y, a]));
      if (!possible()) {
        structure.add(JSON.stringify([x, y, a]));
      }
    }
  }

  const answer = [...structure];
  answer.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  return answer;
}
