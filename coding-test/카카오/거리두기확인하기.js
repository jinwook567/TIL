function solution(places) {
  var answer = [];

  places.forEach((place, floor) => {
    //맨해튼 거리가 2인 모든 경로 탐색.
    for (let i = 0; i < place.length; i++) {
      if (place[i] === "P") {
        //가로 먼저 이동
        for (let j = -1; j <= 1; j++) {
          console.log(place[i + j]);
          if (place[i + j] === "X" || !place[i + j]) continue;
          for (let k = -1; k <= 1; k++) {
            //세로 이동
            if (places[floor + k][i + j] === "P") {
              console.log("here");
              answer.push(0);
              return;
            }
          }
        }

        //세로 먼저 이동
        for (let j = -1; j <= 1; j++) {
          if (places[floor + j][i] === "X" || !places[floor + j][i]) continue;
          for (let k = -1; k <= 1; k++) {
            //세로 이동
            if (places[floor + j][i + k] === "P") {
              console.log("here");
              answer.push(0);
              return;
            }
          }
        }
      }
    }
    answer.push(1);

    //층으로 굳이 안만들고 배열로 탐색. 배열이 층임.
  });

  return answer;
}
