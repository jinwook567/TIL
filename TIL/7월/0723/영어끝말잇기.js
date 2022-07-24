function solution(n, words) {
  const set = new Set();
  set.add(words[0]);
  for (let i = 1; i < words.length; i++) {
    if (set.has(words[i]) || words[i].charAt(0) !== words[i - 1].charAt(words[i - 1].length - 1)) {
      return [(i % n) + 1, Math.ceil((i + 1) / n)];
    }
    set.add(words[i]);
  }
  return [0, 0];
}

const n = 3;
const words = ["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"];
const r = solution(n, words);
console.log(r);

//의사코드

//in loop
//나왔던 단어가 나오면 안된다. 나왔던 단어는 set으로 만들어준다. has로 판단한다.
//이전 단어의 끝 글자와 현재 단어의 첫 글자가 다르면 안된다.
//마지막까지 가면 첫 번째로 넘어간다.

//만일 루프를 다 돌고 나왔다면 [0,0]을 리턴한다.
