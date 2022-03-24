//클로져
//안쪽 스코프에서 만들어진 함수가, 바깥쪽 스코프 변수를 이용하고 있다면 이 함수를 통해서 계속 변수를 사용할 수 있다.
function func1(x) {
  return function () {
    return x;
  };
}

const func2 = func1(10);
console.log(func2());

const arr = [];
for (let i = 0; i < 10; i++) {
  function func() {
    return i;
  }
  arr.push(func);
}

console.log(arr[5]());

const arr2 = [3, 4, 5];

function makeArr(x) {
  return function (y) {
    return x + y;
  };
}

const arr3 = arr2.map(makeArr(10));
console.log(arr3);

//값 숨기기.
function makeCounter(x = 1) {
  return function () {
    return (x = x + 1);
  };
}

const counter = makeCounter();
console.log(makeCounter()());
//makeCounter함수를 계속 생산하니까, 초기값이 계속 1이지.
console.log(counter());
console.log(counter());

function personInfo(initalAge) {
  let age = initalAge;
  return function () {
    return {
      getOlder: () => {
        return ++age;
      },
      getAge: () => {
        return age;
      },
    };
  };
}

const person = personInfo(10);
console.log(person().getOlder());
console.log(person().getOlder());
console.log(person().getOlder());
console.log(person().getOlder());

//값이 담아놓는다. 또 다른 function을 내놔서,, ok?

//재귀함수
function func5() {
  func5();
}

func5();
