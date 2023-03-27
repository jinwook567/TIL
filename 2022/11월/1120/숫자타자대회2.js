//왼손, 오른손의 위치에서 target까지의 거리를 구한다.
//거리가 작은쪽으로 손을 옮긴다.

//위 알고리즘에서 손이 겹치는 경우가 나올 수 있는가?
//나올 수 있는 경우는 없지만 틀렸다. 853 일 때
//3+2+2 = 7
//3+2+3 = 8

//왼손, 오른손 모든 경우에 대해서 완전 탐색을 수행해야한다.

//같은 숫자에 동일한 가중치로 갈 수 있을 때 분기로 만들어서 처리해야 하는지.. 2^이 되버리는데.
//다이나믹 프로그래밍

//재귀를 이용해서 처리를 해보자. 경쟁상황에서 본인을 또 호출하도록.

class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
  }

  enqueue(data) {
    this.queue[this.rear++] = data;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const keyboard = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

const dx = [-1, 0, 1, 0, 1, 1, -1, -1];
const dy = [0, -1, 0, 1, 1, -1, 1, -1];
const weight = [2, 2, 2, 2, 3, 3, 3, 3];

//target까지의 최단거리를 구하는 알고리즘.
//visited 알고리즘은 필요가 없음. 왜냐하면 최대 3번이면 원하는 타겟에 도달 가능하기 때문임.
function getWeight(pos, target) {
  const [y, x] = pos;
  if (keyboard[y][x] === target) return 1;

  const queue = new Queue();

  for (let i = 0; i < dx.length; i++) {
    const nx = dx[i] + x;
    const ny = dy[i] + y;
    if (nx >= 0 && nx <= 2 && ny >= 0 && ny <= 3) {
      queue.enqueue({ x: nx, y: ny, w: weight[i] });
    }
  }

  while (queue.size() > 0) {
    const { x, y, w } = queue.dequeue();
    if (keyboard[y][x] === target) return w;

    for (let i = 0; i < dx.length; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;
      if (nx >= 0 && nx <= 2 && ny >= 0 && ny <= 3) {
        queue.enqueue({ x: nx, y: ny, w: weight[i] + w });
      }
    }
  }
}

const findPos = (number) => {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      if (keyboard[j][i] === number) return [j, i];
    }
  }
};

function recursive(numbers, left, right) {
  let cnt = 0;

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers.charAt(i);

    const leftWeight = getWeight(left, number);
    const rightWeight = getWeight(right, number);

    if (leftWeight === rightWeight) {
      cnt += leftWeight;
      const nLeft = findPos(number);
      const leftCnt = recursive(numbers.slice(i + 1), nLeft, right);

      const nRight = findPos(number);
      const rightCnt = recursive(numbers.slice(i + 1), left, nRight);

      cnt += Math.min(leftCnt, rightCnt);
      break;
    }

    if (leftWeight < rightWeight) {
      cnt += leftWeight;
      left = findPos(number);
    } else {
      cnt += rightWeight;
      right = findPos(number);
    }
  }
  return cnt;
}

function solution(numbers) {
  let left = [1, 0];
  let right = [1, 2];

  const answer = recursive(numbers, left, right);

  return answer;
}

const numbers = "1756";
const numbers2 = "853";
const r = solution(numbers2);
console.log({ r });

const nArr = "1".slice(1);
console.log(nArr.length);
