# JS

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

## call/apply, 데코레이터, 포워딩

## 함수 바인딩

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

## 프로토타입과 상속부터 진행하기.

# 코딩 테스트

## 쿼드 압축 후 개수 세기

depth가 최대 10밖에 되지 않으므로 구현 문제이다. 재귀함수를 이용해서 문제를 해결하면 될 것으로 생각한다. 배열의 길이가 1일 경우 혹은 이차원 배열 내 모든 원소가 같은 경우 리턴하면 된다.
1차원 배열로 만들어서 조작할 수 없다. 층이 아니고 정사각형으로 만들어서 나누는 것이기 때문에.
divide 함수를, for를 이용한 루프가 아닌 map을 이용해서 함수형으로 처리했으면 조금 더 깔끔하게 처리할 수 있었다.

# CS

## Primary Key의 개념

## Super Key의 개념

## Candidate Key의 개념

## Alternative Key의 개념

## Foreign Key의 개념

## Composite Key의 개념

## 관계형 데이터베이스 1:n, n:m 관계에 대해서

## join이란?

두 개 이상의 table을 연결시켜 새로운 결과를 보여주는 것을 말한다.

## left outer join, inner join에 대해서

## RDB와 NoSql을 비교하여 설명.

RDB는 엄격한 schema 구조를 갖는 table 기반 데이터 구조를 갖는다. NoSql은 테이블 형식이 아닌 비정형 데이터를 저장할 수 있도록 지원한다.
RDB는 엄격한 schema로 중복이 없기 때문에 update에 유리하다. NoSql은 중복이 있기 때문에 update시 모든 document에 대해서 바꿔줘야 하기 때문에 시간이 오래 걸린다.

## 수평적 확장과 수직적 확장

수직적 확장은 서버의 스펙을 업그레이드 하는 것, 수평적 확장은 서버의 개수를 늘리는 것.

## Transaction이란?

데이터베이스 내 수행되는 최소 작업 단위로, 데이터베이스의 무결성을 유지하고 DB의 상태를 변화시키는 기능을 수행한다.
