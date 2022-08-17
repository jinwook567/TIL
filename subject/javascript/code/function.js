function hi(x = 3, y = 2) {
  return x + y;
}

//스코프
let a = 0;
const hello = function (a) {
  a = a + 1;
  //함수 내부의 변수는 별개임. 따라서 인자로 받은 a 값을 변경시킬 수 없음.
  return a;
};

hello(a);

//변수 가리기
const x = 3;

function add5(x) {
  // `x`라는 변수가 다시 정의됨
  x = 4;
  function add(x, y) {
    x = 10;
    // `x`라는 변수가 다시 정의됨
    return x + y;
  }
  return add(x, 5);
}

console.log("add", add5(x));

//this
function globalThis() {
  this.name = "진욱";
}

globalThis();
//console.log(global);

function changeThis(newName) {
  let name = this.name;
  this.name = newName;
  return name;
}

const person = {
  name: "lee",
  changeThis,
};

person.changeThis("leeee~");

const person2 = {
  name: "wook",
};

const changeName = changeThis.bind(person2);
changeName("new_name");
console.log(person2);

changeThis.call(person2, "wookCall");
changeThis.apply(person2, ["wookApply", "lalala"]);
console.log(person2);

const Person = () => {
  console.log("this", this);
  this.name = "jinwook";
  this.age = 27;
};
//정의된 this가 없다.

global.age = 20;

const person3 = {
  name: "hi",
  age: () => {
    console.log("this", this);
    return this.age;
  },
  //전역 객체를 가르켜야 하는데, 왜 없지
};

console.log(person3.age());

//const jinwook = new Person();
//화살표 함수는 생성자가 될 수 없다.
function Person2(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}

function Person3(name) {
  this.name = name;
  this.getName = () => this.name;
  //정의된 함수 스코프 체인 내에서 this다.
}

let count = 10;

function func() {
  const arrowFunc = () => {
    this.count = count;
  };
  arrowFunc();
}
func();
//console.log(global);

const jinwook2 = new Person2("jinwook2");
const jinwook3 = new Person3("jinwook3");

function printResult(func) {
  //여기서 this가 변경되었음. 아무것도 없으니까 전역변수 this 가져왔네..
  console.log("printResult", func());
}

printResult(jinwook2.getName);
printResult(jinwook3.getName);

const obj55 = {
  name: "jinwook",
  greet: (name) => {
    // return this.name
    return name;
    //화살표 함수는 this를 이런식으로 쓸 수 없다.
  },
};
//console.log(obj55.greet());
//console.log(obj55.greet("hi"));
//화살표 함수는 this, arguments가 없다.
//스스로의 this, arguments가 없다 -> 다른데서 받아온다는 뜻.
