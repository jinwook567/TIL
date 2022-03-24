function westSide() {
  this.country = "힙합";
  return "hey bro";
}

function c(code) {
  console.log(code);
}

const hello = {
  korean() {
    this.country = "한국";
    return "안녕하세요.";
  },
  japanese() {
    console.log(`이전 나라는 ${this.country}입니다.`);
    this.country = "일본";
    return "곤니찌와";
  },
  german: () => {
    return "구덴탁";
  },
  english: function () {
    return "hi";
  },
  country: "한국",
  westSide,
};

hello.westSide();

const prototype_a = {
  a: 3,
};

const obj_a = Object.create(prototype_a);
const obj_b = Object.create(prototype_a);

//console.log(obj_a.a === obj_b.a);

const prototype_b = {
  //   b: 5,
  a: 5,
};

const prototype_c = {
  c: 7,
};

// Object.setPrototypeOf(obj_a, prototype_b);
// console.log(obj_a.b);

Object.setPrototypeOf(prototype_b, prototype_a);
Object.setPrototypeOf(prototype_c, prototype_b);
//property 상속

console.log(prototype_c.a, prototype_c.b, prototype_c.c);
// property shadowing 발생 a 의 경우

function Person(name) {
  this.name = name;
  //this.name = name;
}

const obj = new Person("진욱");
c(obj);

const obj2 = new Object();
c(obj2);
//생정자로 만들면 좋은 점?

const obj3 = new (function () {
  this.hello = "hi";
})();

function Person() {
  this.name = "진욱";
  this.tall = 181;
}

Person.prototype.weight = 75;
Person.prototype.introduce = function () {
  return `제 이름은 ${this.name}입니다.`;
};

const obj4 = new Person();
console.log(obj4.weight, obj4.introduce());
c(obj4.constructor === Person);

c(obj3);

let obj5 = {};
obj5 = function () {};
obj5.prototype.a = "hi";
//function에만 프로토타입을 지정할 수 있다..?

const obj6 = Object.create(obj5);
c(obj6.a);

//객체 더 알아보기.

//money객체의 won이 바뀔 때마다 혹은 dollar가 바뀔 때마다 동기화 되도록하기.
const money = {
  won: 1,
  dollar: 1080,
};

function Money(amount) {
  this._won = amount;
}

//set 해주는 함수, get 함수 만들어서 동기화 시켜주기.
Money.prototype.setMoney = function (amount) {
  this._won = amount;
};

Money.prototype.getMoney = function () {
  return this._won;
};

Money.prototype.setDollar = function (amount) {
  this._won = amount / 1080;
};

Money.prototype.getDollar = function () {
  return this._won * 1080;
};

const money2 = new Money(5000);
money2.setMoney(1000);
console.log(money2.getDollar());

//getter, setter 함수 사용

function Money3(amount) {
  this._won = amount;
}

Object.defineProperties(Money3.prototype, {
  won: {
    get: function () {
      return this._won;
    },
    set: function (amount) {
      this._won = amount;
    },
  },
  dollar: {
    get() {
      return this._won * 1080;
    },
    set() {
      return this._won / 1080;
    },
  },
});

const money3 = new Money3(1000);
money3.won = 1200;
console.log("money3", money3.dollar);
console.log("monet3", money3.won);
