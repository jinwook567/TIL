# 목표

- 프로그래머스 2단계 테스트. (O)
- 알고리즘 복습 (O)
- 틀린 문제 5문제 다시 풀기. (O)
- JS 복습.
- 이코테 책 복습 (O)

# 코테

## 멀리 뛰기

d[i]는, d[i-1]의 모든 경우에 1을 붙이면 되고, d[i-2]의 모든 경우에 2를 붙여주면 된다.
d[i] = d[i-1] + d[i-2]이다.
존재하던 수열에 각 숫자를 더해주는 것으로, 수열의 길이는 변함이 없다.

## 방문 길이

선분에 대해서 중복을 제거하면 된다. set 자료구조를 이용한다. 좌표만 알면 사이클이 발생할 경우를 고려할 수가 없다. 선분을 나타내는 방식을 (a1,b1) - (a2,b1) 이라면 `a1b1a2b1`, `a2b1a1b1` 2가지 경우로 정의하고 set에다가 추가한다. 그리고 선분 하나당 2개의 정의를 해줬기 떄문에 정답을 도출할 때는 set의 길이를 2로 나누면 된다.

## 광고 삽입

이 문제는 누적합과 슬라이딩 윈도우를 사용하면 해결할 수 있는 문제이다. 다만 이런 류의 문제에서 조심할 점은, 시청 시간이 포함인지 아닌지를 잘 파악해봐야 한다는 것이다. 예시에서 재생 구간별 시청 시각이 주어졌는데 이를 변환해서 구해봤어야 한다. start,end,cost라고 했을 때 end-start+1 = cost 라면 이상, 이하 이고 end-start = cost라면 이상, 미만 혹은 초과, 이하이다. end-cost-1=cost라면 초과,미만이다. 그리고 아래 지문에서 시작점이 01:30:59 이므로, 이상인 지점을 포함한다고 알 수 있다. 프로그래머답게 논리적으로 생각하자.
그리고 루프문의 시작점이 헷갈릴 때는 아주 작은 예시를 통해서 생각해보면 쉽게 알 수 있다.

## 가장 큰 정사각형 찾기

일일이 모든 좌표에 대해서 사각형의 크기를 세는 방법은 O(n^3)으로 성립할 수 없다. n이 최대 1000이기 때문이다.
다이나믹 프로그래밍이다. 내 기준으로 본인, 왼쪽, 위쪽, 왼쪽 위쪽이 전부 1이라면 1을 더해준다. 정사각형이기 때문이다. 셋 중에 가장 작은거 +1...

## 줄서는 방법

팩토리얼을 이용해서 줄여나가는 문제가 맞는데,, 정확히 풀리지는 않는다. 나중에 다시 도전해본다.
