//iterable 프로토콜 -> [Symbol.iterator] 속성에 특별한 함수를 보유하고 있음.
//iterator 프로토콜 -> [Symbol.iterator]에 특별한 함수가 next 메소드를 갖는 객체. next 메소드는 done과 value 속성을 가진 객체를 리턴한다.

function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const iterableObj = generatorFunc();

//iterator 명시적으로 호출하기.
//iterator란 next 메소드를 갖는 객체. next 메소드는 done과 value 속성을 가진 객체를 리턴한다.
const iterator = iterableObj[Symbol.iterator]();
console.log(iterator.next());

//무한대의 generator를 만들고 싶다면?
function* infiniteGeneratorFunc() {
  for (let i = 0; i < Infinity; i++) {
    yield i;
  }
}

// const infiniteIterableObj = infiniteGeneratorFunc();
// for (let number of infiniteIterableObj) {
//   console.log(number);
//   if (number > 300000) break;
// }

//generator 함수 특징.
//하지만 generator 함수는 바로 next 메소드를 사용할 수 있다.
//Generator 함수를 통해 생성된 iterable은 한번만 사용될 수 있다.
//return을 할 경우,, (순회 안됨, return 아래 코드 실행 안됨.)
function* generatorFunc3() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}

for (let number of generatorFunc3()) {
  console.log({ number });
}

const iterableObj3 = generatorFunc3();
console.log(iterableObj3.next());
console.log(iterableObj3.next());
console.log(iterableObj3.next());
console.log(iterableObj3.next());

//다른 generator에서 넘겨준 값을 대신 넘겨주기.
function generalFunction() {
  return 10;
}

function* generatorFunc2() {
  yield* generatorFunc();
  yield* generatorFunc();
  //   yield* generalFunction();
  //제너레이터가 아닌 일반 함수를 yield* 키워드에 넣으면 어떻게 될까 실험.
  //TypeError 리턴함.
}

for (let number of generatorFunc2()) {
  console.log(number);
}

const combinedIterableObj = generatorFunc2();
console.log(combinedIterableObj.next());

//외부에서 Generator 함수에 값 넣어주기 (next에 인수 넣기.)

//generator throw
