공부한 내용

- 알고리즘(정렬 알고리즘, 실전 문제 2문제)
-

# 알고리즘

## 선택 정렬의 개념

선택 정렬은 배열 내에서 가장 작은 원소를 찾고 해당 원소를 배열 내 첫 번째 요소와 교환하고, 그 다음 작은 값을 찾고 그 두 번쨰 요소와 교환하고.. 해당 과정을 배열의 길이만큼 반복한다.
유의해야 할 점은 이미 정렬된 배열의 요소와 교환해주면 안된다는 것이다. (다음 배열의 요소와 교환해주어야함.)

시간 복잡도는 O(N^2)임. 이중 루프가 돌아가므로.

```
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[index] > arr[j]) {
        index = j;
      }
    }
    const temp = arr[i];

    arr[i] = arr[index];
    arr[index] = temp;
  }
  return arr;
}
```

## 삽입 정렬의 개념

삽입 정렬은 필요한 위치에 요소를 삽입하는 방식인데, 삽입할 요소 인덱스 이전에는 데이터가 정렬되어 있다고 가정한다. 정렬되어 있는 데이터 리스트에서 요소가 들어갈 위치를 찾아 삽입하면 된다.
삽입 정렬은 필요할 때만 위치를 바꾸므로, 정렬이 어느정도 되어 있을 때 매우 효과적이다.
첫 번째 요소는 삽입이 되어있다고 가정하기 때문에 2번째 요소부터 삽입하기 시작한다.

시간 복잡도는 이중 루프기 때문에 O(N^2) 시간이 소모된다.

```
function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        //비구조화 할당 활용
      } else {
        break;
      }
    }
  }
  return arr;
}

```

## 퀵 정렬의 개념

(이해가 잘 안갔음.)

퀵 정렬의 개념은 기준이 되는 데이터를 설정하고, 그보다 작은 데이터와 그보다 큰 데이터의 위치를 바꾸면 어떻게 될까? 라는 생각에 기초했다.
퀵 정렬에서는 피벗이라는 개념이 사용된다. 피벗은 비교의 기준이 되는 데이터를 말한다.
호어 분할 방식을 사용할 것인데 호버 분할은 리스트에서 첫 번째 데이터를 피벗으로 설정하고, 왼쪽에서부터 큰 값, 오른쪽에서부터 작은 값을 찾아나간다.

시간 복잡도는 O(NlogN)이다.
분할이 일어나는 속도가 logN, 그리고 분열된 배열 내부에서 확인하는데 O(N) 시간이 소모된다.

```
function sort3(arr) {
  function recursion(arr, start, end) {
    if (start >= end) return;
    const pivot = start;
    let left = start + 1;
    let right = end;

    while (left <= right) {
      console.log(left, right);
      //피벗보다 큰 원소 찾기 (왼쪽에서부터)
      while (left <= end && arr[left] >= arr[pivot]) {
        left++;
      }

      while (right > start && arr[right] <= arr[pivot]) {
        right--;
      }

      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      } else {
        [arr[right], arr[pivot]] = [arr[pivot], arr[right]];
      }
    }

    //피벗보다 작은 원소 찾기. (오른쪽에서부터)
    recursion(arr, start, right - 1);
    recursion(arr, right + 1, end);
  }
  recursion(arr, 0, arr.length - 1);
  return arr;
}

//퀵정렬2
function sort3_2(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const tail = arr.slice(1);

  const left = tail.filter((v) => v <= pivot);
  const right = tail.filter((v) => v > pivot);

  return sort3_2(left) + [pivot] + sort3_2(right);
}
```

## 계수 정렬의 개념

계수 정렬은 데이터가 한정적인 크기일 때, 그리고 내부의 모든 원소가 양의 정수일 때 가능하다.
Array의 index를 활용한 방법이다.

시간 복잡도는 O(N+K)이다. K는 최댓값이다.
최댓값만큼 루프를 돌고 N만큼 추가로 루프를 돌아야하기 때문이다. (값을 추출하는 과정에서)

```
function sort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);

  for (let num of arr) {
    count[num]++;
  }

  const result = [];

  for (let i = 0; i < count.length; i++) {
    if (count[i] !== 0) {
      for (let j = 0; j < count[i]; j++) result.push(i);
    }
  }

  return result;
}

```

<br />

# 코딩테스트 문제

## 두 배열의 원소 교체

가장 큰 값, 가장 작은 값을 찾는 함수를 구현하려고 하였으나, sort를 미리 해놓은 다음에 K번 반복하면 매우 쉽게 해결할 수 있다. 첫 번째 배열의 값이 두 번째 배열의 값보다 작다면 해당 배열의 요소를 바꿔치기한다.

## 안테나(실전 문제)

안테나의 길이가 가장 짧기 위해서는, 집 위치 배열 중에서 중간 index 값을 리턴시키면 된다.

## 실패율

우리가 구하고자 하는 것은 라운드의 실패율을 정렬한 것이다.
stages에는 round를 치르고 있는 사람의 정보가 있으므로, stages를 루프를 도는게 아니라 N만큼 루프를 돌면서 스테이지별로 실패율을 구해야한다.
스테이지 정보와 실패율을 배열로 처리해서 넣어주고 sort 메소드를 사용해서 정답을 도출한다.

```
function solution(N, stages) {
  const arr = [];

  for (let i = 1; i <= N; i++) {
    const rate = stages.filter((v) => v === i).length / stages.filter((v) => v >= i).length;
    arr.push({ rate, round: i });
  }

  return arr
    .sort((a, b) => {
      if (a.rate === b.rate) {
        return a.round - b.round;
      } else {
        return b.rate - a.rate;
      }
    })
    .map((v) => v.round);
}
```

## 카드 정렬하기

카드를 최소의 비교로 정렬을 하기 위해서는, 작은 카드 개수 묶음부터 더해나가면 된다.
아래와 같이 값을 더해나가는 방식도 존재하고, 최소힙을 사용하여 값이 작은 값을 2개 추출하고 더한 다음에 해당 값을 다시 힙에 넣어주는 방식으로 해도 좋다. 힙이 없을 때 까지 반복하면 된다.

```
function solution(N, cards) {
  if (cards.length < 2) return cards[0];

  let acc = cards[0] + cards[1];
  let answer = acc;
  cards.sort((a, b) => a - b);
  for (let i = 2; i < N; i++) {
    answer += acc + cards[i];
    acc += cards[i];
  }
  return answer;
}
```

<br />

# CS 지식

## thread의 개념

thread란 process 내에서 실행되는 동작의 단위이다. stack 메모리 영역을 제외한 data, heap, code 영역을 공유합니다.

## multi thread란?

하나의 process에는 여러 작업이 존재한다. 여러 작업을 병렬적으로 처리하기 위해서 multi thread를 사용한다. multi thread에는 한 process에 여러개의 thread가 있고,
stack 메모리 영역을 제외한 data, heap, code 영역을 공유합니다.

## thread는 왜 독립적인 stack memory가 필요한가?

각 thread는 독립적으로 기능을 실행하기 때문에. 독립적으로 기능을 실행하기 위해서는 함수를 독립적으로 호출해야함.

## thread에서 pc register란?

multi thread에서 각각의 thread는 pc register를 가지고 있다. 한 process 내에서도 thread끼리 context switch가 일어날 때 정보를 저장해야 하기 때문이다.

# process와 thread의 차이는 무엇인가?

process는 실행 파일이 memory에 적재되어 CPU를 할당받는 작업의 단위이고, thread는 작업이 실행되는 동작의 단위이다.
process에는 code, data, heap, stack 영역이 있고 thread는 stack 영역을 제외한 메모리 영역을 공유한다.

# multi process와 multi thread

mutli
