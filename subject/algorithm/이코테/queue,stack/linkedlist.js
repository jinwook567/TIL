//node를 만들어주고 연결 시키는 것은 그냥 다음 node 값을 전체로 넣어버리는건가.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  find(value) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === value) {
        return currNode;
      }
      currNode = currNode.next;
    }
    return "찾는 값이 없습니다.";
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      //list가 비었을 때.
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insert(node, value) {
    //해당 노드 뒤에 삽입
    const newNode = new Node(value);
    newNode.next = node.next;
    node.next = newNode;
  }

  remove(value) {
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode;

    //value 찾기.
    while (currNode) {
      if (currNode.value === value) {
        prevNode.next = currNode.next;
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }

    console.log("삭제하려는 값이 없습니다.");
  }

  display() {
    let currNode = this.head;
    let displayString = "[";
    while (currNode) {
      displayString += `${currNode.value},`;
      currNode = currNode.next;
    }
    displayString = displayString.substring(0, displayString.length - 1);
    displayString += "]";
    console.log(displayString);
  }
}

const list = new LinkedList();
list.append(3);
list.append(4);
list.append(4);
list.remove(4);
list.insert(list.find(4), 10);

list.display();

//find, append, insert, remove, display,
