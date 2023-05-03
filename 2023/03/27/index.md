---
date: 2023-03-27
---

# 강한 결합

- 구체에 의존한다.
- 유연성이 떨어진다.

# 느슨한 결합

- 시스템의 구성 요소가 서로 약하게 연관돼 관계를 떼어낼 수 있고, 그 때문에 한 구성 요소의 변화가 있더라도 다른 구성 요소의 성능이나 존재에 최소한의 영향을 끼치는 상태.
- 구성 요소가 다른 구성 요소의 정의에 대해 많은 지식이 없어도 사용할 수 있는 상황.
- 인터페이스를 통해 의존하는 객체에 대한 구체적인 정보없이 맺어진 추상적인 관계. 인터페이스 규약이 지켜지는한 사용부에서는 어떠한 수정 작업도 일어나지 않는다.

# 인터페이스

- 일종의 명세서라고 할 수 있다.
- 구체에 의존하기보다, 인터페이스에 의존하면 클래스의 변경이 다른 클래스에 영향을 미치지 않을 수 있음. 직교성 증가.

# 추상 클래스

- 여러 클래스들의 공통된 역할을 하는 클래스를 부모 클래스로 추출.
- 추상 클래스로는 객체를 생성할 수 없음. 추상 클래스를 상속받은 자식 클래스로만 객체를 생성할 수 있음. (직업을 전문직이라고 하지 않는다. 개를 포유류라고 하지 않는다.)
- 추상 키워드를 사용하기 위해서는 추상 클래스여야한다. 만일 추상 클래스에서 공통된 역할을 정의할 수 없다면, 추상 키워드를 사용하여 해당 메소드가 존재함만을 명시하고, 구체적인 구현은 하지 않는다.

# 부끄럼쟁이 코드를 작성하라.

- 불필요한 것은 다른 모듈에 보여주지말고 다른 모듈의 구현에 의존하지 않는 코드를 작성해라.
- 객체의 상태를 바꿀 필요가 있다면, 여러분을 위해 객체가 직접 상태를 바꾸게 하라. 낮은 결합도, 높은 응집도를 위해서.

# 데메테르 법칙

- 메서드 호출을 엮지말라.
- 무언가에 접근할 때 "."을 하나만 쓰려고 노력해보라.
- 점 하나 규칙은 예외가 있다. 엮는 것들이 절대로 바뀌지 않을 것 같다면 규칙을 지키지 않아도 좋다.

# 묻지말고 시켜라.

- 객체와 객체가 협력하는 경우 다른 객체에게 정보를 요구하지말고 그냥 행위하도록 시키라는 의미이다. 정보 은닉의 중요성.
- 다른 객체의 정보를 얻어와서 어떤 일을 처리하면, 결합도가 상승하게 되며 캡슐화의 장점이 사라진다. 따라서 그냥 시킨다. 해당 객체에게 필요한 정보를 가져오라고 시키면 응집도도 상승하게 된다.

# 싱글턴 패턴

- 객체의 인스턴스가 오직 1개만 생성되는 패턴
- 하나의 오브젝트가 리소스를 많이 차지할 때
- 외부 네트워크와 연결이 되는데, 이 연결이 단 1개만 되어야 할 때 등.

# 전략 패턴

- 옵션들마다 행동을 모듈화해서 독립적이고 상호 교체 가능하도록 만드는 것이 전략패턴이다.
- 늦게 걷는 직립 보행 로봇, 늦게 걷는 사족 보행 로봇, 빠르게 걷는 직립 보행 로봇, 빠르게 걷는 사족 보행 로봇을 구현한 4개의 클래스가 있다고 가정해보자. 직립 보행의 다리 개수가 2개에서 1개로 수정하려면 직립 보행 과 관련된 클래스를 전부 수정해주어야 한다. 또한 만약 온도를 느낄 수 있는 기능이 추가된다고 하면, 모든 클래스 내에 온도와 관련된 메소드를 삽입 해주어야하고 온도의 종류에 따라서 매우 많은 클래스가 생성될 것이다.. 전략 패턴을 사용하면 개방 폐쇄 원칙을 준수하면서 수정할 수 있으며 전략을 조합하고 원하는 때에 심지어 전략을 교체할수도 있다. 평지에서는 직립 보행하다가, 경사면 사족 보행해라 이런 것도 가능한 것이다.
- 동일 계열의 알고리즘을 정의하고 인터페이스를 생성하고 인터페이스에 맞도록 특정 행위를 정의한다. 로봇을 만들 때 각 전략에 따른 특정 행위를 정해주고 필요에 따라 전략을 교체해주면 된다.

# TS에서 객체 지향 관련된 기능을 지원한다.

- TS에서 자바처럼 클래스에 인터페이스를 적용할 수 있다. implements 키워드를 사용해서.
- private, protected, public 키워드 등
- 추상 클래스