// const timeout = setTimeout(() => {
//   console.log("hello");
// }, 2000);

//clearTimeout(timeout);

//promise
const promise = Promise.resolve(10);
console.log(promise);

const promise2 = new Promise((resolve, reject) => {
  console.log("iam running...");
  setTimeout(() => {
    resolve("return value");
  }, 2000);
});
//promise를 만들게되면 반드시 실행된다.
promise2
  .then((value) => {
    return value + value;
  })
  .then((newValue) => console.log("newValue", newValue));
//값을 넘겨줘도된다.

promise2
  .then((value) => {
    return new Promise((resolve, reject) => {
      console.log("iam running2");
      setTimeout(() => {
        resolve(value);
      }, 2000);
    });
  })
  .then((result) => console.log("result", result));
//then은 메소드 자체도 promise를 리턴하고, 콜백에서 반환된 값이 Promise의 결과이다.
