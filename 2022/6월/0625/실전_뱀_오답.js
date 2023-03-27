function solution(N, apples, changes) {
  //머리가 갔던 경로를 넣어주면 간편하게 꼬리의 위치를 알 수 있다.
  const steps = {
    R: [0, 1],
    L: [0, -1],
    T: [-1, 0],
    B: [1, 0],
  };

  const directions = ["L", "T", "R", "B"];
  let dIndex = 2;

  let changeTime = 0;
  let moves = 0;
  let position = [0, 0];
  const queue = new Queue();
  queue.enqueue(position);

  while (true) {
    if (changeTime < changes.length) {
      if (moves === changes[changeTime][0]) {
        dIndex = (changes[changeTime][1] === "L" ? dIndex - 1 : dIndex + 1) % 4;
        changeTime++;
      }
    }

    const direction = directions[dIndex];

    const ny = position[0] + steps[direction][0];
    const nx = position[1] + steps[direction][1];

    const arr = queue.get();
    const isMyBody = arr.find((v) => v[0] === ny && v[1] === nx);
    if (ny < 0 || nx < 0 || nx >= N || ny >= N || isMyBody) {
      return moves + 1;
    }

    position = [ny, nx];
    queue.enqueue([ny, nx]);

    const eatApple = apples.find((v) => v[0] - 1 === ny && v[1] - 1 === nx);
    if (!eatApple) {
      queue.dequeue();
    }
    //사과 및 queue 처리 해줘야함.
    moves++;
    //종료 조건, 벽 또는 자기 자신에 부딪히면
  }
}
