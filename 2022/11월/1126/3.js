const subway = ["1 2 3 4 5 6 7 8", "2 11", "0 11 10", "3 17 19 12 13 9 14 15 10", "20 2 21"];

function solution(subway, start, end) {
  subway = subway.map((v) => v.split(" "));

  let answer = Infinity;
  //찾아서 recursive 호출
  function recursive(currentIndex, transferCnt, currentStation) {
    if (subway[currentIndex].find((v) => v === end)) {
      answer = Math.min(answer, transferCnt);
      return;
    }

    for (let i = 0; i < subway.length; i++) {
      if (subway[i].find((v) => v === currentStation) && currentIndex !== i) {
        recursive(i, transferCnt + 1, currentStation);
      }
    }
  }
}

function isStationExist(subway, station) {
  return subway.find((v) => v === station);
}

//1. start역이 존재하는 모든 subway 경로 탐색.
//2. 만일 경로 내에 있으면 최소 환승 갯수로 넣어주고 종료
//3. 위 과정을 반복.
