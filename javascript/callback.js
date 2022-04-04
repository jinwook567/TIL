// * 함수를 다른 함수의 인자로써 제공하는 것이 콜백함수

//콜백 함수는 제어권을 넘긴다는 점.
// let number = 0;
// const cbFunc = () => {
//   number += 1;
//   if (number > 4) clearInterval(timer);
//   console.log(number);
// };

// var timer = setInterval(cbFunc, 300);

//제어권 함수의 인수의 순서가 중요하다.

//call 함수는 첫 번째 인자를 this로 바인딩, 이후 인수는 호출할 함수의 매개변수로 넘겨줌.

//콜백 함수는 this 바인딩이 되어있지 않으면 전역 객체를 가르키나, 바인딩이 되어있으면 바인딩된 것을 가르킨다. (당연한 내용임)

// * 콜백 함수 내부에서 this를 유지시키는 방법.
const obj1 = {
  name: "obj1",
  func: function () {
    console.log("this", this.name);
  },
};

const obj2 = {
  name: "obj2",
  func: obj1.func,
};

const callback2 = obj2.func;
setTimeout(callback2, 1500);

//bind 메소드를 이용하면 간단하게 callback의 this를 강제로 지정할 수 있다.
