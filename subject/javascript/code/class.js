//class는 생성자 함수를 간결하게 만든 것.

const methodName = "introduce2";

class Person {
  constructor({ name, gender }) {
    this.name = name;
    this.gender = gender;
  }
  introduce() {
    return `안녕하세요. 제 이름은 ${this.name}이고 ${this.gender} 성별입니다.`;
  }
  [methodName]() {
    return "반갑습니다.";
  }
  get age() {
    return this._age || 10;
  }
  set age(number) {
    this._age = number * 2;
  }
  static staticFunc() {
    return "static은 인스턴스로 만든 후에는 사용이 불가능합니다.";
  }
}

const person = new Person({ name: "진욱", gender: "남자" });
console.log(person.introduce2());
person.age = 20;
console.log(person.age);
console.log(Person.staticFunc());

class Human extends Person {
  constructor({ grade, ...rest }) {
    super(rest);
    //super가 먼저 와야함.
    this.grade = grade;
  }
  introduce() {
    return `안녕하세요. Human Class입니다. ${super.introduce()} 제 이름은 ${this.name}이고 ${
      this.gender
    } 성별입니다.`;
  }
}
//super를 사용해서 부모 class에 직접 접근.
//super를 바로 써주면 constructor에 접근.

const human = new Human({ grade: "4", name: "이진욱", gender: "남자" });
console.log(human);
console.log(human.introduce());
