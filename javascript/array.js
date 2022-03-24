const a = [5, 2, 1];
a.fill(5);
a.fill(6, 0, 2);

const b = [10, 10, 10];
b[1] = 12;

const arr = [1, 2, 3, 4, 5, 6, 7];
// arr.splice(1, 999, "one", "two", "three", "four"); //1,5,6,7

arr.splice(1, 0, "one", "two");
//console.log(arr);

//sort

const arr2 = [1, 3, 2, 4, 6, 8, 4, 2];

arr2.sort((x, y) => x - y);
//x가 y보다 크면, 양수 양수면 순서 반대로, -> 순서가 반대로 라는 것은 작은게 앞쪽으로 온다는 소리.
//x가 y보다 작으면 음수, 음수면 순서 그대로 -> 순서가 그대로 라는 것은 작은게 앞쪽에 그대로 있다는 소리.

arr2.sort((x, y) => y - x);
//반대임. 큰 것부터 옴.

//양수가 앞쪽에  이러면 큰 놈이 앞으로 오게됨.

const arr5 = [2, 3, 4, 5, 6];
const arr6 = arr5.join("&");

//요소 찾기
const arr7 = ["a", "b", "c", "c", "e", "f"];
const index = arr7.indexOf("c"); //2
const lastIndex = arr7.lastIndexOf("c"); //3
console.log(index, lastIndex);

const startIndex = arr7.indexOf("c", 2);
console.log(startIndex);
