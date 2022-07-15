function solution(msg) {
  const set = ["a"];
  //array index is index

  for (let i = 65; i < 65 + 26; i++) {
    set.push(String.fromCharCode(i));
  }
  const result = [];

  let k = 0;
  for (let i = 0; i < msg.length; i += k) {
    k = 0;
    let name = "";
    let index = 0;

    while (i + k <= msg.length) {
      name += msg.charAt(i + k);
      if (msg.charAt(i + k) === "") {
        result.push(index);
        break;
      }
      const sIndex = set.findIndex((v) => v === name);

      if (sIndex === -1) {
        result.push(index);
        set.push(name);
        break;
      }

      index = sIndex;
      k++;
    }
  }
  return result;
}

const r = solution("ABABABABABABABAB");
console.log(r);
