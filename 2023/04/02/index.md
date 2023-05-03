# navigator 객체

- 브라우저의 정보를 제공하는 객체
- 주로 호환성 문제를 해결하기 위해서 사용된다.

# 웹표준

- 예전에 넷스케이프와 IE 사이에서 브라우저 전쟁이 일어나게 되었다.
- 각자 새로운 혁신적인 기능을 추가하는 방식으로 경쟁하였는데, 이로인해 같은 이벤트임에도 불구하고 메소드명이 다르거나 하는 문제가 대두되었다.
- 웹개발에 문제를 겪다보니 국제적인 기구(W3C- world wide web consortium)에서 웹표준을 정하게 되었다.
- 사실 법률적으로 정해져있는 표준은 없다. W3C의 토론을 통해 나온 recommendation이 가장 최상위이다.

# 크로스 브라우징

- 브라우저마다 렌더링 엔진이 다르고, OS에 따라 폰트가 다르기 때문에 전부 100% 동일한 모습을 보여줄 수는 없다. 동일성이 아닌 제공하는 정보의 동등성에 집중한다.
- 적어도 표준 웹기술을 채용하여 다른 기종 혹은 브라우저에 따라 구현되는 기술을 비슷하게 만든다.
- 또한 어느 한쪽에 최적화되어 치우치지 않도록 공통 요소를 사용하여 웹사이트를 제작한다.

# Chromium

- 오픈소스 웹 브라우저 프로젝트.
- 크롬, 삼성 인터넷, 웨일 등이 Chromium 기반으로 제작되었다.

# Webkit

- 오픈소스 웹 브라우저 엔진(브라우저가 아니다.)
- Safari에서 사용된다.
- Blink 엔진은 Webkit에서 fork 되었다고 한다. Blink 엔진은 Chromium에서 렌더링 엔진으로 사용된다.

# 기업에서는 왜 브라우저를 만드려고 할까?

- 어느 브라우저에 종속될 경우, 해당 브라우저에서 기업에서 제작한 획기적인 기능을 지원하지 않는다면 무용지물이다.
- 광고 삽입, 데이터 수집, 자사 서비스와의 강력한 연동.
- 일종의 플랫폼 역할. (브라우저를 많이 쓰니까.)

# HTML5

- HTML 5번째 버전.
- 비디오, 오디오 등 다양한 부가 기능과 최신 멀티미디어 콘텐츠를 액티브X없이 브라우저에서 쉽게 볼 수 있는 것을 목표로 한다.
- header, section, article 등 의 구역을 나누는 요소가 추가되었다.
- video, audio, canvas 등 멀티미디어 요소 추가
- 불필요한 태그들 삭제