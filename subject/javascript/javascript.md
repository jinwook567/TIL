## nullish 병합 연산자 "??"

`a ?? b`의 의미는 다음과 같다 `a !== null && a !== undefined ? a : b`

`||` 과의 차이와 헷갈리면 안된다. ||은 null, undefined가 아니라 falsy를 기준으로 판단한다.

```
let height = 0
height = height || 100
height2 = height ?? 100
```

0은 falsy이기 때문에 height는 100으로 나온다. 하지만 height2는 0으로 나온다.
또한 연산자의 우선순위가 낮기 때문에 복잡한 표현식 내에서는 괄호를 포함시키는게 좋다.

## 테스트를 왜 해야하는가?

개발을 테스트 할 때 일일이 수동으로 코드를 재실행하며 결과값을 확인하는 것은 매우 번거롭고 정확하지 않다. 코드를 수동으로 재실행하면서 다양한 케이스를 고려하지 못할 수 있기 때문이다.

## Babel

바벨은 트랜스파일러로 모던 자바스크립트를 구 표준을 준수하는 코드로 변형시켜 준다.

## 폴리필

개발자는 스크립트에 새로운 함수를 추가하거나 수정해서 스크립트가 최신 표준을 준수할 수 있게 작업할 수 있다. 이렇게 변경된 표준을 준수할 수 있도록 기존의 함수 동작 방식을 변경하거나 새롭게 구현한 함수의 스크립트를 폴리필이라고 한다.

## 생성자 함수

생성자 함수는 유사한 객체를 여러개 만들 때 유용하다.

```
function Person(name, age){
    this.name = name
    this.age = age
}

const person = new Person("홍길동", 19)
```

생성자에는 return 문이 없다. this가 자동으로 리턴되기 때문이다.

만일 return 문을 사용한다면

1. 객체를 리턴한다면 this대신 객체를 반환한다.
2. 객체가 아니라면 this를 반환한다.

## 가비지 컬렉션

JS는 도달 가능성이라는 개념으로 메모리를 관리한다.

도달 가능한 값은 어떻게든 접근하거나 사용 가능한 값이다. 예시는 아래와 같다.

```
let user = {name: "john"}
user = null
//여기서 name:john은 가비지 컬렉터 수거 대상으로 사라진다. 참조할 수 없으므로.
```

객체들이 연결되어 섬 같은 구조를 이루는데 이 섬에 도달할 수 있는 방법이 없는 경우 섬을 구성하는 객체 전부가 메모리에서 사라진다.

## Iterable

반복 가능한 개체를 말한다. for of 를 통해서 순회할 수 있다.

Iterable 직접 만들어보기.

1. for ..of 가 시작되자 마자 [Symbol.iterator]를 호출한다. 만일 [Symbol.iterator]가 없다면 오류를 호출한다. [Symbol.iterator]는 반드시 iterator 객체를 반환해야한다. iterator 객체는 next 메소드를 반드시 포함한다.
2. 이후 for..of는 반환된 객체만을 가지고 동작한다.
3. 만일 다음값으로 넘어가고 싶다면 next 메소드를 호출한다.
4. next 메소드의 반환값은 반드시 `{done:boolean, value:any}`의 형태여야 한다. `done=true`는 반복문이 종료되었음을 알린다.

```
let range = {
    from: 0,
    to: 5
}

range[Symbol.iterator] = function(){
    return {
        current: this.from,
        last: this.to

        next(){
            if(this.current <= this.last){
                next({done: false, value: this.current++})
            } else {
                next({done: true})
            }
        }
    }
}
```

## 프로퍼티 플래그

- writable: `true`이면 값을 수정할 수 있다. 그렇지 않다면 읽기만 가능하다.
- enumerable: `true`이면 반복문을 사용해 나열할 수 있다. 그렇지 않다면 불가능하다.
- configurable: `true`이면 프로퍼티 삭제나 플래그 수정이 가능하다. 그렇지 않다면 삭제나 플래그 수정이 불가능하다. 기본 방식으로 만들면 모든 flag는 true로 만들어진다.

`Object.defineProperty(obj, name, descriptor)`메소드를 통해서 정의할 수 있다.

### 접근자 get

객체의 속성에 접근 시 호출할 함수를 바인딩 한다. 메소드를 단순히 속성처럼 불러올 수 있다.

```
const person = {
    age:16,
    name: "jinwook"
    get info(){
        return `${age} ${name}`
    }
}
person.info
//person.info()이 형태가 아닌, 단순히 속성에 접근하는 것처럼 사용할 수 있다.
```

접근자 함수는 매개변수를 가질 수 없다. 객체 리터럴에서 같은 속성에 다수의 키를 바인딩 할 수 없다.

### 설정자 set

객체의 속성에 할당할 함수를 바인딩 한다.

```
const language = {
    log : [],
    set current(value){
        this.log.push(value)
    }
}

language.current = "EA"
language.current = "KR"
```

language.log는 `["EA", "KR"]`을 나타낸다.

## 데코레이터

인수로 받은 함수의 행동을 변경해주는 함수를 데코레이터라고 한다.

함수에 직접적으로 처리하지 않고 데코레이터를 이용할 때 생기는 장점.

1. 데코레이터 함수를 재사용 할 수 있다.
2. 캐싱 로직이 분리되어 기존 함수의 복잡도가 증가하지 않는다.
3. 필요하다면 여러개의 데코레이터를 중첩시킬 수 있다.

## call

func.call(context, arg1, arg2 ...)
첫 번째 인수가 this, 이어지는 인수가 func의 인수가 되어 func 함수가 호출된다.

## apply

func.apply(context, args)
call과 매우 유사하다. 다만 유사 배열 객체인 args를 인수로 받는 다는 점이 차이점이다.

## 함수 바인딩

객체 메소드를 콜백으로 전달 할 때, this가 사라지는 문제가 생긴다. 이 문제를 해결하는 방법에 대해서.

```
const user = {
    name: "홍길동",
    sayHi(){
        console.log(user.name)
    }
}

setTimeout(user.sayHi, 3000)
//undefined가 찍힌다. this가 유실되었기 때문.
```

해결책 1. 래퍼 함수 사용

```
setTimeout(() => user.sayHi(), 3000)
```

하지만 위와 같은 방식은 함수를 호출하고 3초 사이에 user 값을 변경시키면 변경된 값이 호출된다.

해결책 2. bind 사용

Bind 사용법

```
let user = {
    name : "홍길동"
}

function func(){
    console.log(this.name)
}

const boundFunc = func.bind(user)
boundFunc() //홍길동
```

`let boundFunc = func.bind(context)` this가 context로 고정된 함수 func가 반환된다.

Bind를 활용한 문제 해결

```
const user = {
    name: "홍길동",
    sayHi(){
        console.log(user.name)
    }
}

const sayHi = user.sayHi.bind(user)
setTimeout(sayHi, 3000)
```

3초 사이에 user의 값이 바뀌어도 처음에 바인딩 해놓은 user.name이 출력된다.

### bind 부분 적용

this 뿐만 아니라 인수 바인딩도 가능하다. 쓰는 이유는 포괄적인 함수를 기반으로 덜 포괄적인 함수로 변형 시킬 수 있다는 점이다. send(from, to, text)를 인수를 바인딩해서 sendTo(to, text)로 변화시킬 수 있다. 나머지 인수들은 그대로 전달된다.

```
function multiple(a,b){
    return a * b
}

const boundFunc = multiple.bind(null, 2)
boundFunc(3) //6
boundFunc(4) //8
```

## 화살표 함수의 특징

1. this를 지원하지 않는다.
2. arguments를 지원하지 않는다.

## 클래스와 생성자 함수와 다른 점

1. 클래스로 만든 함수는 `[[IsClassConstructor]]: true` 속성이 존재한다. new와 함께 호출하지 않으면 에러가 발생한다.
2. 메소드를 for..in로 순회할 수 없다.

## 클래스 필드

`프로퍼티 = 값`을 써주면 간단히 클래스 필드를 만들 수 있다.
클래스 필드의 중요한 특징 중 하나는 User.prototype이 아닌 개별 객체에만 적용 된다는 것이다.

## 클래스 필드로 바인딩 된 메소드 만들기

```
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("안녕하세요.");

setTimeout(button.click, 1000); // 안녕하세요.
```

## protected, private 메소드

객체 지향 프로그래밍의 중요한 원리는 내부 인터페이스와 외부 인터페이스를 구분 짓는 것이다.
본문에서는 커피 머신을 예제로 들었다. 커피 머신 내부는 굉장히 복잡한 로직들이 많지만 우리는 커피 추출 버튼 하나만 누르면 된다.

JS는 protected 프로퍼티를 지원하지 않지만, 모방해서 만들어본다면

```
class CoffeeMachine {
    constructor(power){
        this._power = power
    }

    get power() {
        return this._power
    }

    set power(power){
        if(power < 0) return new Error("power는 음수가 될 수 없습니다.")
        this._power = power
    }
}
```

power를 읽기만 가능하도록 만든다면, set 설정자를 없애버리면 된다.

`private`는 #을 붙이면 된다. 클래스 외부나 자손 클래스에서 접근할 수 없다.

# 클래스

## extends 키워드를 이용한 상속 예제

```
class Animal {
    constructor(name){
        this.name = name
        this.speed = 0
    }
    run(speed){
        this.speed = speed
    }
}

class Rabbit extends Animal {
    hide(){
        console.log(`${this.name}이 숨었습니다.`)
    }
}

const rabbit = new Rabbit("검은 토끼");
rabbit.hide();
```

extends는 프로토타입을 기반으로 작동한다. 따라서 Rabbit.prototype에서 메소드를 찾지 못하면 Animal에서 메소드를 가져온다. 만일 Rabbit에서 메소드가 있다면 해당 메소드를 사용한다.

부모 클래스에 존재하는 메소드를 자식 클래스에서 재정의하면 자식 클래스에서 정의된 메소드가 호출되는데 위의 원리와 동일하다. 이를 메소드 오버라이딩 이라고 한다. (ex.Rabbit에서 run 메소드를 정의할 경우.)

## super 키워드

`super.method(...)은 부모 클래스에 정의된 메소드를 호출한다. 자식 생성자에서만 호출할 수 있다. 예시는 아래와 같습니다.

```
class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }
  run(speed) {
    this.speed = speed;
  }
  stop() {
    this.speed = 0;
  }
}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name}이 숨었습니다. 현재 스피드는 ${this.speed}입니다.`);
  }

  stop() {
    super.stop();
    this.hide();
  }
  //메소드 오버라이딩
}

const rabbit = new Rabbit("검은 토끼");
rabbit.run(100);
rabbit.stop();
//speed를 100으로 설정했으나, stop 메소드를 호출해서 스피드를 0으로 만든다. 이 때 부모의 stop 메소드가 호출된다.
```

## 생성자 오버라이딩

Rabbit에는 자체 constructor가 없었다. 자식 클래스에서 constuctor가 없다면 아래와 같은 현상이 자동으로 발생한다.

```
class Rabbit extends Animal {
    constructor(...agrs){
        super(...args)
    }
}
```

생성자 오버라이딩을 할 때 꼭 super 키워드를 호출해줘야 한다. super 키워드는 this를 사용하기 전에 반드시 호출해줘야 한다.

상속 클래스의 생성자 함수가 실행되면, 빈 객체를 만들고 this에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대하기 때문이다. 따라서 super 키워드를 사용해줘야 하는 것이다. 사용하지 않으면 this가 만들어지지 않는다.

```
class Rabbit extends Animal {
    constructor(name, size){
        super(name)
        this.size = size
    }
}
```

## 정적 메소드

prototype이 아닌 클래스 함수 자체에도 메소드를 설정할 수 있다. 이러한 메소드를 정적 메소드라고 한다. 인스턴스 생성없이 클래스에서 바로 호출이 가능하다. 특정 인스턴스가 아닌 클래스 전체에 필요한 기능을 만들 때 사용할 수 있다. static 키워드를 사용해서 만든다.

정적 메소드의 특징

1. this를 통해 상위 오브젝트에 접근할 수 없다.
2. 동일한 클래스 내에서는 같은 정적 메소드끼리 this를 사용해서 접근이 가능하다.
3. 일반 메소드에서는 `this.constructor.정적메소드` 형태로 사용할 수 있다.
4. 정적 메소드와 정적 프로퍼티는 상속된다.

# 프로미스

## promise 객체 만드는 법

```
let condition = false
const promise = new Promise((resolve, reject) => {
    if(condition) resolve("성공")
    else reject("실패")
})
```

## promise then

```
promise.then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);
```

첫 번째 인수는 프라미스가 이행되었을 떄 실행되는 함수, 두 번째 인수는 프라미스가 거부되었을 떄 이행되는 함수

## promise api

### promise.all

여러 개의 프로미스를 동시에 실행시키고 모든 프로미스가 완료되면 결과값을 받는다.

```
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1) , 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2) , 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3) , 3000)),
]).then(result)
```

result에 결과값이 배열 형태로 받아온다.

### promise.race

promise를 배열로 받고 가장 빨리 처리되는 promise를 반환한다.

### Promise.resolve

`let promise = new Promise(resolve => resolve(value));`의 축약형이라고 할 수 있다. 프로미스를 반환해야 할 때 주로 사용된다.

## 프로미스 체이닝

promise then을 호출하면 프로미스가 반환된다. 반환된 프로미스는 당연히 then을 호출할 수 있다.

```
const promise = new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000))

promise.then(result => {
    console.log(result)
    return result* 2
}).then(result => {
    console.log(result)
    return result * 2
}).then(result => {
    console.log(result)
    return result *2
}).then(result => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result*2), 3000)
    })
})
//1,2,4가 출력된다.
//마지막에 3초 후 8이 출력된다. 프로미스를 생성해도 된다.
```

비동기 동작은 프로미스를 반환하도록 하는 것이 좋다. (아바타 예제)
나중에 체인을 확장할 때 손쉽게 체인을 확장할 수 있으므로.

## async 함수

async 함수를 사용하면 해당 함수는 항상 promise를 반환한다.

```
async function a(){
    return 1
}
a().then(r => console.log(r)) //1
```

## await 함수

async 함수 내에서만 사용할 수 있다. 프로미스 변수의 result 값이 변수에 삽입된다.

## 프로미스화

콜백을 받는 함수를 프로미스를 반환하는 함수로 변환시키는 것을 프로미스화라고 한다.

```
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
}
```

loadScript의 promise화.

```
function promisift(f) {
  return function (...args) {
    //함수의 인수를 받아오는 래퍼함수.
    return new Promise((resolve, reject) => {
      function customCallback(err, result) {
        if (err) reject(err);
        else resolve(result);
      }
      args.push(customCallback);
      f.call(this, ...args);
      //기존 함수 호출
    });
  };
}
```

promise화의 일반화

## 제너레이터

### 제너레이터의 개념과 예시

일반 함수는 하나의 값만(혹은 0개)을 반환한다. 하지만 제너레이터를 사용하면 여러개의 값을 필요에 따라 하나씩 반환할 수 있다.

제너레이터 함수 예시.

```
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const generatorObj = generator();

const g1 = generatorObj.next();
const g2 = generatorObj.next();
const g3 = generatorObj.next();
console.log(g1, g2, g3);
//{done:false, value:1} {done:fasle, value:2} {done:fasle, value:3}
//마지막 yield3을 return 으로 바꾸면 {done:true,  value:3}으로 된다.
```

### 제너레이터와 이터러블

```
for (let value of generator){
    console.log(value)
}
//1,2,3
```

`done:true` 일 떄 마지막 value를 무시한다. for..of로 모든 값이 출력되기를 원한다면 yield 로 반환해야한다. (return이 아니라)

### 이터러블 대신 제너레이터 사용해보기

```
function* generator(from ,to){
    for(let i=from; i<=to; i++){
        yield i;
    }
}
```

### 제너레이터 컴포지션

제너레이터 컴포지션이란 제너레이터 안에 제너레이터를 임베딩 할 수 있는 것을 말한다. `yield*`를 사용하면 된다.

```
function* generator2(){
    yield* generator(1,10);

    yield* generator(20,100);
}
```

### yield를 사용해 제너레이터 안 밖 정보 교환하기

`yield`는 결과를 바깥으로 전달할 뿐만 아니라, 값을 제너레이터 안으로 전달하기 까지 한다. 값을 제너레이터 함수 안으로 전달하기 위해서는 next(arg)를 사용해야 한다. 이 떄 arg는 yield의 결과가 된다.

```
function* gen() {
  const result = yield "2+2="; (*)
  console.log({ result });
}

const genObj = gen();
genObj.next().value
//2+2=
genObj.next(4);
//next(4)를 실행하면 result에 값이 삽입되고 log가 찍힌다. next를 실행하기 전까지는 별표 위치에 멈춰있기 떄문이다.
```

1. genObj.next()를 처음 호출할 때는 항상 인수가 없어야한다. next()를 호출하면 yield의 결과가 반환된다. 그리고 \*위치에 멈춰있다.
2. 그 이후 4가 result에 할당된다.

만일 gen 함수에 yield가 1개 더 있다면 genObj.next(4).value 에는 다음 yield의 값이 도출된다.

### generator.throw

에러를 yield안으로 전달하려면 generator.throw(err)을 호출하면 된다. 호출부분에서 혹은 generator함수 내에서 try, catch 블록으로 잡을 수 있다.

## async 이터레이터와 제너레이터

```
async function* generateSequence(from, to) {
  for (let i = from; i <= to; i++) {
    await new Promise((resolve, rejct) => setTimeout(resolve, 3000));
    yield i;
  }
}
```

async를 함수 앞에 붙이면 간단하게 비동기로 처리할 수 있다.
정리를 하자면 일반적인 이터레이터는 데이터를 가져오는데 시간이 걸리지 않을 때 적합하다. 그런데 약간의 지연이 있어서 데이터가 비동기적으로 들어오는 경우에는 async 이터레이터와 async 제너레이터, for..of 대신 for await ..of 가 사용된다.

# 클로저

## 렉시컬 환경

### 변수

자바스크립트는 실행 중인 함수, 코드 블록, 스크립트 전체는 렉시컬 환경이라고 하는 내부 숨김 연관 객체를 갖는다. 두 부분으로 나뉜다.

1. 환경 레코드(Environment Record) - 모든 지역 변수를 프로퍼티로 저장하고 있는 객체. this값과 같은 기타 정보도 여기에 저장된다.
2. 외부 렉시컬 환경에 대한 참조

변수는 특수 개체인 환경 레코드의 프로퍼티이다. 변수를 가져오거나 변경하는 것은 환경 레코드에 접근해서 가져오거나, 수정하는 것과 동일하다.

스크립트 전체와 관련된 렉시컬 환경은 전역 렉시컬 환경이라고 한다. 전역 렉시컬 환경은 외부 참조를 가지고 있지 않다.

스크립트와 관련된 렉시컬 환경의 추이를 알아보겠다.

```
let phrase;
phrase = "hello"
```

1. 스크립트가 시작되면 스크립트 내에서 선언한 변수가 전부 렉시컬 환경에 올라간다. `uninitialized` 상태이고 JS는 이를 인지하지만, let 키워드를 만나기 전까지는 접근할 수 없다.
2. phrase는 undefined가 된다. let을 만났기 때문에 이 때부터 사용할 수 있다.
3. phrase는 "hello"가 된다.

### 함수 선언문

함수 선언문으로 선언한 함수는 일반 변수와 달리 바로 초기화된다는 차이점이 있다. 따라서 함수가 선언되기 이전에 함수를 사용해도 돌아가는 이유가 그것 때문이다.
함수 선언문으로 작성된 것만 매칭된다는 점을 잊지말자.

```
let phrase = "hi"
function say(name){
  return `${phrase}${name}`
}
```

1. 렉시컬 환경에 say는 바로 함수가 매칭된다.

### 내부와 외부 렉시컬 환경

함수를 실행하면 새롭게 렉시컬 환경이 만들어진다. 함수 호출 시 넘겨받은 매개 변수와 지역 변수가 저장된다.

코드에서 변수에 접근할 때, 우선적으로 내부 렉시컬 환경에서 찾고, 없다면 외부 렉시컬 환경을 한 단계씩 넘어가면서 확장한다. 외부 렉시컬 환경이 전역 렉시컬 환경이 될 때 까지 반복한다.

### 함수를 반환하는 함수

```
function makeCounter(){
  let count = 0;
  return function(){
    return ++count
  }
}

let counter = makeCounter()
counter() //1
counter() //2
counter() //3
```

함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다. 함수는 `[[Environment]]`라는 숨김 프로퍼티를 갖는데, 여기에 함수가 만들어진 곳의 렉시컬 환경이 참조된다.
`[[Environment]]`는 함수가 생성될 때 딱 한번 세팅되고 영원히 값이 변경되지 않는다.

따라서 counter.[[Environment]]에는 `{count:0}`이 있는 렉시컬 환경에 대한 참조가 저장된다.
`counter()`을 실행하면 새로운 렉시컬 환경이 생겨나고, `[[Environment]]`에 저장된 렉시컬 환경을 외부 렉시컬 환경으로 참조한다.
`count`변수가 필요한데 익명 함수에는 지역 변수가 없다. 따라서 외부 렉시컬 환경에서 count를 찾는다. 이제 `++count`를 하면서 1을 증가해야 하는데, 변숫값 갱신은 변수가 저장된 렉시컬 환경에서 이루어진다.

### 정리

클로저는 외부 변수를 기억하고, 이 외부 변수에 접근할 수 있는 함수를 의미한다.
JS의 함수는 모두 클로저이다.

## 가비지 컬렉션

함수 호출이 끝나면, 함수에 대응하는 렉시컬 환경은 메모리에서 제거된다. 이게 함수 호출이 끝나면 변수를 참조할 수 없는 이유이다. 하지만 호출이 끝나도 여전히 도달 가능한 중첩 함수가 있을 수도 있다. `[[Environment]]`에 외부 함수 렉시컬 환경에 대한 정보가 저장된다. 즉 도달 가능한 상태인거다. 이 정보는 메모리에 유지가 된다.

메모리에서 삭제를 시켜줄려면 도달 가능하지 않은 상태로 만들어주면 된다.

```
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g가 살아있는 동안엔 연관 렉시컬 환경도 메모리에 살아있습니다.

g = null; // 도달할 수 없는 상태가 되었으므로 메모리에서 삭제됩니다.
```

# 깊은 복사

참조형 데이터의 경우 내부 프로퍼티를 전부 복사해줘야 한다. 참조형들을 참조하고 있는 주솟값을 가질 뿐이기 때문이다.
내부 프로퍼티를 재귀적으로 깊게 들어가면서 복사한다.

```
const copyDeep = (obj) => {
  let result = {};
  if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      result[key] = copyDeep(obj[key]);
    }
  } else {
    result = obj;
  }
  return result;
};
```

JSON.parse, JSON.stringify도 가능한 방법이지만, 메소드나 getter,setter 등 JSON으로 변경할 수 없는 프로퍼티들은 전부 무시한다. 순수한 정보만 다룰 때 이렇게 해야한다.

# undefined와 null

undefined는 어떤 변수에 값이 존재하지 않을 때이고 null은 사용자가 명시적으로 없음을 표현하기 위해서 대입한 값이다.

# 함수 선언문과 함수 표현식

## 함수 선언문

함수 선언문은 전체가 호이스팅 된다.
같은 함수를 나중에 정의할 경우, 덮어써지기 때문에 유의해야한다.

```
function a(){

}
```

## 함수 표현식

함수 표현식은 변수만 호이스팅 되고, 함수 자체는 호이스팅 되지 않는다.

```
const a = function(){

}
```
