function check(str1, banned) {
  if (str1.length !== banned.length) return false;
  for (let i = 0; i < banned.length; i++) {
    if (banned.charAt(i) !== "*") {
      if (banned.charAt(i) !== str1.charAt(i)) return false;
    }
  }
  return true;
}

function solution(user_id, banned_id) {
  const set = new Set();

  function recursion(user_ids, pick, depth) {
    if (depth >= banned_id.length) {
      const str = [...pick].sort((a, b) => (a > b) - (a < b)).join("");
      set.add(str);
      return;
    }

    user_ids.forEach((id, index) => {
      if (check(id, banned_id[depth])) {
        const newUser_Id = user_ids.filter((v, i) => i !== index);
        recursion(newUser_Id, [...pick, id], depth + 1);
      }
    });
  }
  recursion(user_id, [], 0);
  return set.size;
}
//내가 이해한 게 맞다.
//그냥 완전 탐색 문제 맞다.
//user_id의 길이가 매우 작으므로 마음대로 해도 좋다.

const user_id = ["frodo", "fradi", "crodo", "abc123", "frodoc"];
const banned_id = ["*rodo", "*rodo", "******"];
const r = solution(user_id, banned_id);
console.log(r);
