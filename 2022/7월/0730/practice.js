// call
function sayHi() {
  console.log(this.name);
}

const person1 = { name: "홍길동" };
const person2 = { name: "이몽룡" };

sayHi.call(person1);
sayHi.call(person2);
//첫 번째 인수를 강제로 this로 바인딩 시켜버린다.

let worker = {
  someMethod() {
    return 1;
  },
  slow(x) {
    return x * this.someMethod();
  },
};

function cachingDecorator(func) {
  const cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    } else {
      let result = func.call(this, x);
      cache.set(x, result);
      return result;
    }
  };
}

worker.slow = cachingDecorator(worker.slow);

function hello() {
  console.log(...arguments);
}

const hi = (arguments) => {
  console.log(arguments);
};

hi("a", "b", "c");

class Hello {
  hi = "hi";
  sayHi = () => {
    console.log(this.hi);
  };
  sayHi2() {
    console.log(this.hi);
  }
}

const hello2 = new Hello();
setTimeout(hello2.sayHi2, 1000);
