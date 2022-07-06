# 프로그래머스

## [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript)

스택 자료구조를 이용하는데, 그 이유는 맨 아래 깔린 값이 가장 큰 값 이여야 해서 그렇다. 스택의 마지막보다 큰 수를 만나면 pop()을 해주고, k를 하나씩 지워준다. 그리고 루프를 다 돌았는데도 k의 값이 남아있을 수 있다. 이런 경우에는 stack에서 뒤에 개수를 k개 만큼 잘라줘야한다. 큰 수가 나올수록 앞에꺼를 제거해 나간다는 원리를 stack을 이용한 문제였다.
