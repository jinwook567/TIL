function Human({ name, country }) {
  this.name = name;
  this.country = country;
}
//prototype문법은 무엇인가를 받아와서 동적으로 할당을 할 수가 없었음. 하지만 생성자 문법은 가능함.
//생성자는 함수의 형태로, 객체 형태인 prototype을 넣을 수가 없음. 따라서 Person.prototype에다가 직접 대입하는 형태로 넣어줘야함.
Human.prototype.introduce = function () {
  return "안녕하세요.";
};

Human.isKorean = function (country) {
  return country === "korea";
};
//정적 메소드. 해당 생성자와 관련된 일반적인 작업들만함.

const jinwook = new Human({ name: "진욱", country: "korea" });
//jinwook은 Human 생성자의 인스턴스임.

console.log(jinwook);
console.log(jinwook.introduce());
console.log(Human.isKorean(jinwook.country));

// * Array
const arr = new Array(100);
//array 100개 만들기 [empty, empty, ....]

arr.fill(1000);
//1000으로 요소 전부 채워버리기.

arr.shift();
//배열 앞에서 삭제하고, 삭제된 요소 반환

arr.unshift(100);
//배열 앞에서 추가하고, 길이 반환

const arr2 = [1, 2, 3, 4, 5, 6];
const arr3 = [...arr2];
arr2.splice(2, 1, "three");
console.log(arr2);
//splice로 배열 중간에서 바꿔치기.

arr3.sort((x, y) => y - x);

console.log(arr3.join("&"));

const every = arr3.every((number) => number < 10);
console.log(every);

const some = arr3.some((number) => number < 2);
console.log(some);
