class MaxHeap {
  constructor() {
    this.heap = [];
  }

  add(element) {
    //마지막에 추가한 다음에, 부모와 반복하면서 위치를 변경해준다.
    this.heap.push(element);
    let childIndex = this.heap.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (parentIndex >= 0) {
      if (this.heap[parentIndex] < this.heap[childIndex]) {
        const temp = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[childIndex];
        this.heap[childIndex] = temp;
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      } else {
        break;
      }
    }
  }

  delete() {
    //맨 위에꺼를 제거하고, 맨 마지막 요소를 최상단 부모 node에 삽입한다. 그 이후 bubble down 과정을 거친다.
    const max = this.heap[0];
    const end = this.heap.pop(); //맨 마지막 요소를 제거하고 그 값을 담음.
    this.heap[0] = end;

    //처음에는 무조건 left node와 변경될 수밖에 없다.
    let parentIndex = 0;
    let childIndex = parentIndex * 2 + 1;
    let swap = false;
    //왼쪽 비교하고, 오른쪽 비교하고 하면 됨.
    while (this.heap[childIndex]) {
      //왼쪽 비교.
      if (this.heap[parentIndex] < this.heap[childIndex]) {
        const temp = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[childIndex];
        this.heap[childIndex] = temp;
        swap = true;
      }

      //오른쪽 비교.
      childIndex++;
      if (this.heap[childIndex] && this.heap[parentIndex] < this.heap[childIndex]) {
        const temp = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[childIndex];
        this.heap[childIndex] = temp;
        swap = true;
      } else {
        childIndex--;
      }

      if (!swap) break;
      parentIndex = childIndex;
      childIndex = parentIndex * 2 + 1;
    }
    return max;
  }
}

const maxHeap = new MaxHeap();
maxHeap.add(6);
maxHeap.add(3);
maxHeap.add(5);
maxHeap.add(1);
maxHeap.add(20);
maxHeap.add(30);
maxHeap.add(10);
maxHeap.add(20);
maxHeap.add(30);
maxHeap.delete();

//2n+2 -> 2n+1 n+0,5 -> n이 된다. 루트 노드 찾기.
//그리고 구현하는 방식에 대해서 서술.. ㅇㅋㅇㅋ 굳굳 javascript 코드로 어떻게 하는지도 알려주기.

console.log(maxHeap);
