function dfs(me, money, profitObj, enroll, referral) {
  const referMoney = Math.floor(money * 0.1);
  profitObj[me] += money - referMoney;

  //종료 조건

  if (referMoney < 1) return;
  const index = enroll.findIndex((name) => name === me);
  if (referral[index] === "-") return;

  dfs(referral[index], referMoney, profitObj, enroll, referral);
}

function solution(enroll, referral, seller, amount) {
  const profitObj = {};
  enroll.forEach((name) => {
    profitObj[name] = 0;
  });

  seller.forEach((name, index) => {
    dfs(name, amount[index] * 100, profitObj, enroll, referral);
  });

  return Object.entries(profitObj).map((v) => v[1]);
}

const enroll = ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"];
const referral = ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"];
const seller = ["young", "john", "tod", "emily", "mary"];
// const seller = ["young"];
const amount = [12, 4, 2, 5, 10];
const r = solution(enroll, referral, seller, amount);
console.log(r);
