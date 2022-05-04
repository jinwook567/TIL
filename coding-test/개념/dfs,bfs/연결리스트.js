//연결리스트
//요소 추가와 삭제가 반복되는 로직이라면 연결리스트. 다만 탐색에 시간이 오래걸린다.
//배열은 요소의 추가와 삭제에 선형시간이 걸리기 때문에. 배열은 탐색에 유리한 자료구조임.

//첫 번째 노드를 head 라고함.
//마지막 node를 tail 이라고함.

//단일 연결 리스트
//이중 연결 리스트
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

//value, next만을 가지고 있음. node는.

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
    }
    return currNode;
  }

  append(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail = newNode;
      this.tail.next = newNode;
      //tail.next를 왜 newNode라고 하는지는 잘 모르겠다.
    }
  }

  insert(node, newValue) {
    const newNode = new Node(newValue);
    newNode.next = node.next;
    //node의 next에 연결
    node.next = newNode;
    //기존 node의 next는 newNode에 연결
  }

  remove(value) {
    //찾는 로직도 같이했다.
    let prevNode = this.head;
    while (prevNode.next.value !== value) {
      prevNode = prevNode.next;
    }

    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
    }
  }
}
