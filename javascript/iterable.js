const str = "hello world";

//iterable이란 순회 가능한 객체이다. (for of...)
console.log(str[Symbol.iterator]);

//Symbol.iterator 안에 특정한 함수가 들어가 있으면 iterable이다.

for (let c of str) {
  console.log(c);
}

const string = [...str];
console.log(string);

const [a, b] = str;
console.log(a, b);

const stringArray = Array.from(str);

const range = {
  from: 1,
  to: 10,
};
//for of를 통해서 1,2,3,4 ... 10까지 출력 되게끔 만들기. (순회 가능하도록.)

//Symbol.iterator 함수 추가 해주어야함.
//Symbol.iterator 함수는 next 메소드를 가진 객체를 꼭 반환해야한다. (이터레이터를 반환해야한다.)
//next 메소드는 {done: boolean; value: any} 타입을 반환한다.
range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (const number of range) {
  console.log("number", number);
}

for (const number2 of range) {
  console.log("number2", number2);
}

const range2 = {
  from: 0,
  to: 10,
  [Symbol.iterator]: function () {
    this.current = this.from;
    //초기값 설정
    return this;
  },
  next() {
    if (this.current < this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (const number of range2) {
  console.log({ number });
}

for (const number2 of range2) {
  console.log({ number2 });
}

//반복문이 상태 공유를 한다? 이해 안감..

// * iterator 명시적으로 호출하기.
const iterator = range2[Symbol.iterator]();

// next 메소드를 가진 객체를 리턴한다.
let result = iterator.next();
result = iterator.next();
result = iterator.next();
result = iterator.next();
result = iterator.next();
result = iterator.next();
console.log(result);
// 반복 과정을 여러번 쪼갤 수 있다.

//Array.from
//Array.from은 iterable, 유사 배열 객체를 배열로 만들어준다.

//str은 iterable이기 때문에 Array.from으로 배열로 만들 수 있다.
const arrayStr = Array.from(str, (string) => string + string, { a: 1 });
//세 번째 인수를 통해 this를 바인딩 할 수 있다.
console.log(arrayStr);

// * 제너레이터에 대한 개념.

//generator 함수를 호출하면 iterable protocol을 만족하는 객체를 생성한다.
//만드는 방법은 일반 함수를 만드는 방법과 동일하되, *을 붙여준다.
function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}
const iterableObj = generatorFunc();
console.log(iterableObj[Symbol.iterator]);
const iterableObjIterator = iterableObj[Symbol.iterator]();
console.log({ iterableObjIterator });
//next 메소드를 가짐.

for (let number of iterableObj) {
  console.log(number);
}

//제너레이터 함수를 통해서 생성된 iterable은 한번만! 사용될 수 있다.

let resultIterableObj = iterableObjIterator.next();
console.log(resultIterableObj);

function* generatorFunc2() {
  yield* iterableObj;
  //제너레이터 함수를 통해서 생성된 iterable은 한번만! 사용될 수 있다. 동일하게 적용됨.
  yield* generatorFunc();
}

const iterableObj2 = generatorFunc2();

for (let number of iterableObj2) {
  console.log(number);
}

function* generatorFunc3() {
  const hi = yield 1;
  console.log("generatorFunc3Hi", hi);
  return 2;
  yield 3;
}
//return을 던지게되면, {done: true, value:2}를 리턴하고 다음 next의 값은 {done: true, value: undefined}을 리턴한다. 끝났으므로.
//return을 통해 반환된 값은 순회하지 않는다.

const iterableObj3 = generatorFunc3();
iterableObj3.next();
//바로 이렇게 실행할 수 있다.
console.log(iterableObj3.next("hello"));
console.log(iterableObj3.next("hello1"));
console.log(iterableObj3.next("hello2"));

for (const number of generatorFunc3()) {
  console.log("gen3", number);
}

//외부 코드와 제너레이터간의 정보를 교환할 수 있다.
//이 부분 잘 모르겠음.
