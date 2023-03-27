const words = ["frodo", "front", "frost", "frozen", "frame", "kakao"];
const queries = ["fro??", "????o", "fr???", "fro???", "pro?"];

function left(arr, target, stringNum, strLen) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    //만일 미드의 값이 target이면서 mid-1이 target이 아니여야함.

    const midString = arr[mid].slice(0, stringNum);
    const midStringLen = arr[mid].length;

    if (midString === target && midStringLen === strLen) {
      if (mid === 0) return mid;
      const beforeString = arr[mid - 1].slice(0, stringNum);
      const beforeLength = arr[mid - 1].length;
      if (target === "fro" && strLen === 5) {
        console.log(midString, midStringLen, beforeString, beforeLength, start, end, mid);
      }

      if (beforeLength !== strLen || beforeString !== target) return mid;
      //완벽히 일치..
    }

    if (target <= midString) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
}

function right(arr, target, stringNum, strLen) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    //만일 미드의 값이 target이면서 mid-1이 target이 아니여야함.

    const midString = arr[mid].slice(0, stringNum);
    const midStringLen = arr[mid].length;

    if (midString === target && midStringLen === strLen) {
      if (mid === arr.length - 1) return mid;
      const nextString = arr[mid + 1].slice(0, stringNum);
      const nextLen = arr[mid + 1].length;
      if (nextLen === strLen && nextString === target) return mid;
      //완벽히 일치..
    }

    if (midString > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
}

function solution(words, queries) {
  const N = words.length;
  const reverseString = (str) => [...str].reverse().join("");
  const reverse = words.map((v) => reverseString(v));
  words.sort((a, b) => (a > b) - (a < b));
  reverse.sort((a, b) => (a > b) - (a < b));
  //알파벳 소문자도 순서가 있는 것이기 때문에. 물음표 앞부분 떼어서 이진 탐색으로 검색해도.

  //left, right 방식? 아니면 내가 쓰는 방식.

  const checkStringNum = (str) => {
    return [...str].reduce((acc, cur) => (cur !== "?" ? acc + 1 : acc), 0);
  };

  function getTargetInfo(str) {
    if (str.charAt(0) === "?") {
      //역방향
      const reversedString = reverseString(str);
      const stringNum = checkStringNum(reversedString);
      const target = reversedString.slice(0, stringNum);
      return { stringNum, target, isReverse: true, strLen: str.length };
    } else {
      const stringNum = checkStringNum(str);
      const target = str.slice(0, stringNum);
      return { stringNum, target, isReverse: false, strLen: str.length };
      //정방향
    }
  }

  const answer = [];
  queries.forEach((query) => {
    const { stringNum, target, isReverse, strLen } = getTargetInfo(query);
    const array = isReverse ? reverse : words;
    const l = left(array, target, stringNum, strLen);
    const r = right(array, target, stringNum, strLen);

    answer.push(r - l + 1);
  });
  console.log(answer);
  return answer;
}

//left, right 방식으로 해야함.

solution(words, queries);

function binarySearch(arr, target, stringNum, strLen, start, end) {
  if (start > end) return;
  const mid = Math.floor((start + end) / 2);

  const midString = arr[mid].slice(0, stringNum);
  const midStringLen = arr[mid].length;
  if (midString === target) {
    if (midStringLen === strLen) result.push(mid);
    binarySearch(arr, target, stringNum, strLen, start, mid - 1);
    binarySearch(arr, target, stringNum, strLen, mid + 1, end);
    return;
  }

  if (midString < target) {
    binarySearch(arr, target, stringNum, strLen, mid + 1, end);
  } else {
    binarySearch(arr, target, stringNum, strLen, start, mid - 1);
  }
}
