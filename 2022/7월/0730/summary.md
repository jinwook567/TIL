# 목표

- JS 정리 마무리
- TS 1회차 정리
- CS 네트워크까지 정리
- 코딩테스트 1문제 풀기

# JS

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
