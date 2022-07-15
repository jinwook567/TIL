const str = " ";
console.log(Number(str));

function solution(files) {
  const data = files.map((file, i) => {
    let headIndex = 0;
    const arr = [...file];

    while (arr[headIndex] === " " || !Number.isInteger(+arr[headIndex])) {
      headIndex++;
    }

    const head = file.slice(0, headIndex);

    let numberIndex = headIndex;
    const max = numberIndex + 5;

    while (Number.isInteger(+arr[numberIndex]) && numberIndex < max) {
      numberIndex++;
    }

    let number = file.slice(headIndex, numberIndex);
    //앞에서부터 0을 전부 제거해버리고 만약 number가 빈칸이 되어버리면 0으로 넣어준다.
    let k = 0;
    while (number.charAt(k) === "0") {
      k++;
    }
    number = k >= number.length ? 0 : Number(number.slice(k));

    const tail = file.slice(numberIndex);

    const origin = file;

    return { head, number, tail, i, origin };
  });

  data.sort((a, b) => {
    const headA = a.head.toLowerCase();
    const headB = b.head.toLowerCase();

    if (headA === headB) {
      if (a.number === b.number) {
        return a.i - b.i;
      }
      return a.number - b.number;
    }
    return (headA > headB) - (headA < headB);
  });

  return data.map((v) => v.origin);
}

const files = ["img12.png", "img00.png", "img022222.png", "img1.png", "IMG01.GIF", "img2.JPG"];
const r = solution(files);
console.log(r);

console.log("ABc".toLowerCase());
