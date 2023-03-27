function solution(numbers) {
  return numbers.map((v) => {
    const bit = [...v.toString(2)];

    if (bit[bit.length - 1] === "0") {
      bit[bit.length - 1] = "1";
      return parseInt(bit.join(""), 2);
    }

    for (let i = bit.length - 1; i >= 0; i--) {
      if (bit[i] === "1") {
        if (i === 0) {
          bit.unshift("1");
          bit[i + 1] = "0";
        } else {
          if (bit[i - 1] === "1") continue;
          bit[i - 1] = "1";
          bit[i] = "0";
        }
        break;
      }
    }
    return parseInt(bit.join(""), 2);
  });
}

const numbers = [2, 7];
const r = solution(numbers);
console.log(r);
