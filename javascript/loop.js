let i = 0;

// while (i < 10) {
//   if (i === 3) {
//     continue;
//   }
//   //만약 더해주는 코드가 없다면 i는 3에서 멈춰있기 때문에 계속 반복되고 있음.
//   console.log(i);
//   i++;
// }

// do {
//   i++;
//   console.log(i);
// } while (i < 10);
//무조건 한번 실행

// for (let k = 0; k < 10; k++) {
//   if (k === 3) {
//     break;
//   }
//   console.log("k", k);
// }

console.log(null ?? 5);

const person = {
  name: "jinwook",
  company: {
    phone: "010..",
    mail: "dddd@dddd",
  },
};

console.log(person.company?.phone);
