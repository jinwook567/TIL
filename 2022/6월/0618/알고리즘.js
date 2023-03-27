const arr = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

// 선택 정렬
function sort1(arr) {
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

//삽입 정렬
function sort2(arr) {
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

//퀵 정렬.
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

const r = sort3_2(arr);

//계수 정렬
function sort4(arr) {
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
