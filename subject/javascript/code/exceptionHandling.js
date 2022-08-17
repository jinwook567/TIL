// * 예외처리에 관해서
//에러가 나면 코드의 실행이 중단됨. javascript는 에러가 나서 코드가 중단되더라도, 실행 흐름을 원상복구 할 수 있는 기능 제공함.
try {
  console.log("try block");
  throw new Error("error occurred");
} catch (err) {
  console.log(err);
} finally {
  console.log("finally code run");
  //finally는 에러가 나든 말든 실행됨.
}

//* 커스텀 에러 만들기.
class MyError extends Error {
  constructor(value, ...params) {
    super(...params);
    this.value = value;
    this.name = "myError";
  }
}

try {
  throw new MyError("This is custom error");
} catch (err) {
  console.log(err);
  if (err instanceof MyError) {
    console.log("my error에서 발생되었습니다.");
  }
}

// * 비동기에서의 예외처리
// 비동기식으로 작동되는 콜백 내부에서 발생된 에러는 바깥쪽 try catch block으로 에러를 잡아낼 수 없다.
try {
  setTimeout(() => {
    try {
      throw new MyError("콜백함수 안에서 에러가 발생하였습니다.");
    } catch (err) {
      console.log("콜백 함수 내부 try catch", err);
    }
  });
} catch (err) {
  console.log("비동기", err);
}

// * Promise
// then 메소드에 첫 번째로 넘겨준 콜백이 실행되지 않고, 두 번째 인수로 넘겨준 콜백이 대신 실행됨. 그리고 에러 객체를 첫 번째 인수로 받음.
const pSuccess = new Promise((resolve, reject) => {
  resolve("promise value");
});

pSuccess
  .then((value) => value)
  .then((value) => {
    return new Promise((resolve, reject) => {
      throw new Error("promise 내 에러 발생");
    });
  })
  .then(
    (value) => value,
    (e) => console.log("다음 then에서 두 번째 인자로 받아옵니다.", e)
  );

//catch로도 받을 수 있음.
pSuccess
  .then((value) => {
    return new Promise((resolve, reject) => {
      throw new Error("promise 내 에러 발생");
    });
  })
  .then((value) => value)
  .catch((e) => e)
  .then((value) => console.log(`promise catch block을 사용해서 받아온 에러객체 입니다. ${value}`));

//then 메소드 연쇄 내에서 에러가 발생하면, 처음 만나는 에러 처리 콜백으로 코드의 실행 흐름 건너뛰게됨.

// * 비동기 함수 에러 처리
// 비동기 함수 내에서는 동기식 처리와 동일하게 try, catch, finally 구문을 사용하여 에러를 핸들링 할 수 있다.

async function helloworld() {
  try {
    const res = await fetch("https://nonexistent-domain.nowhere");
    //여기서 await을 써주지 않으면 에러가 발생해도 catch 블록으로 코드의 실행 흐름이 이동하지 않는다.
  } catch (e) {
    console.log("비동기 함수 내 에러값", e);
  }
}
