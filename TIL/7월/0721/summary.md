# 목표

- 복습 (O)
- Hash Table, process, multi process (O)
- 이력서 고민하기. (O)
- 코딩테스트 2문제
- 못푼 문제 2문제

(문제 해결 삽질)

# CS

## Hash table은 어떤 자료구조 입니까?

## Direct address table

input k에 대한 strong assumptions이 있어야한다. k는 양의 정수이고, k의 값이 너무 크면 안된다. 또한 중복값이 있으면 안된다. 그렇다면 우리는 간단하게 배열을 선언하면 된다.
k를 배열의 index라고 가정하고 key 값으로 사용해주면 된다.
하지만 이 방식은 k가 클 경우에 많은 메모리 낭비를 일으킬 수 있고, 다양한 자료형을 받을 수 없다.

## collision(충돌)이란?

## collision을 해결할 수 있는 방안?

## open addressing 3가지 방법

## separate chaining 설명 및 시간 복잡도

## 좋은 hash function의 기준은 무엇인가요?

## process에 대해서 설명해주세요.

## process의 memory 영역에 대해서 설명해주시오.

## PC Register란?

## multi process란?

## Context와 PCB

## Context swtich란?

## process state는 무엇이 있나요?

# 코딩 테스트

## 경주로 건설

board의 크기는 25이하.. 완전 탐색으로 수행해도 충분히 작은 크기.
최단거리가 아니더라도, 도착 지점에 도착할 수 있는 모든 경우의 수를 탐색하고 비용을 계산해야한다.

왜 dfs를 이용해서 풀면 풀 수 없는가? 시간 복잡도는 어떻게 되는가?

bfs를 수행하면 최단 거리를 알 수 있다. 하지만 이 문제는 가중치가 포함되어 있다. 따라서 다익스트라 알고리즘으로 해결해야한다.
BFS로 풀던 중에, 이미 방문해서 visited 한 경우에는 또 다시 방문할 수 없다. 하지만 visited를 방문해야한다. 왜냐면 방문할 때 더 작을 수 있기 때문이다.
이 때 일종의 다이나믹 프로그래밍 방식을 사용한다. 만일 visited 한 곳의 distance 누계가 본인보다 크다면, 방문한다. 왜냐면 현재 내가 최적이니까.
BFS + Dynamic programming이다. 이 방식은 다익스트라와 유사하다. (각 지점에 대해서 최솟값을 구해나가는..)
왜 cost를 더해주면 되는거지..? nCost가 아니라? 이 문제 잘 모르겠다..

다익스트라, BFS에 관해서 다시 한번 공부하자..
[최단거리 찾기](https://betterprogramming.pub/5-ways-to-find-the-shortest-path-in-a-graph-88cfefd0030f)

## 광고 삽입

완전 탐색 문제인가?!
만일 광고 시간이 처음 TV 시작 시간과 마지막 TV 상영 시간의 길이보다 길다면, 끝 점에 맞추면 된다. 만일 끝 점의 길이보다 길다면, 그냥 처음에 넣으면 된다.
그리고 각각 처음 시작점에 놓아보면서 시간을 일일이 계산해보는 수밖에 없지 않나?
끝점은 본인이 포함이 안되니까..
