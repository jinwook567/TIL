function solution(enroll, referral, seller, amount) {
  const map = {};
  const money = {};
  enroll.forEach((name, i) => {
    map[name] = referral[i];
    money[name] = 0;
  });

  //나를 데려온 사람을 확인해서 0.1만큼 넣어주기.
  function bubble_up(me, fee) {
    console.log({ me, fee });
    if (map[me] === "-") return;
    if (fee === 0) return;
    money[me] += Math.floor(fee * 0.9);

    bubble_up(map[me], Math.floor(fee * 0.1));
  }

  seller.forEach((name, i) => {
    money[name] += amount[i] * 0.9 * 100;
    bubble_up(name, Math.floor(amount[i] * 0.1 * 100));
  });

  console.log(money);
  //map의 값이 - 혹은, Math.floor 한 값이 0이면 종료
}

const enroll = ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"];
const referral = ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"];
const seller = ["young", "john", "tod", "emily", "mary"];
const amount = [12, 4, 2, 5, 10];
const r = solution(enroll, referral, seller, amount);
