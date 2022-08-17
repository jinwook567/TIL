var hi = 3;

//hosting 현상

//함수 스코프
function hello() {
  var hi = 5;
  console.log(hi);
}
hello();
console.log(hi);

function scope() {
  var hello = 5;
  {
    hello = 3;
  }
  console.log("scope", hello);
}
scope();

//전역 스코프

//한번도 정의되지 않은 스코프에서 안쪽 스코프에서 let, const, var 안써주면 전역스코프로 설정됨.
function scope2() {
  globalScope = 5;
}

scope2();

{
  globalScope = 0;
}
console.log(globalScope);

//전역 객체
global.hello = 3;
console.log(global);

let o = 1;

function reference(k) {
  k = 3;
  return k;
}

reference(o);

let obj = { number: 3 };

function referenceObj(obj) {
  obj.number = 5;
}

referenceObj(obj);
console.log(obj);
