//queue -> first in first out
//queue는 array, linked list 방식으로 구현할 수 있다.

//맨 앞이 front, 마지막이 rear

//array에서 queue를 구현하기가 어려운데, 그 이유는 배열의 길이가 한정되어 있기 때문에. (javascript는 아님. 배열의 길이가 알아서 변동됨.)

//array로 queue 구현하기.
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(newValue) {
    this.queue[this.rear] = newValue;
    this.rear++;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  peek() {
    return this.queue[this.front];
    //지금 맨 앞이 무엇인지 알려주기.
  }

  size() {
    return this.rear - this.front;
    //queue의 길이 알려주기.
  }
}

const queue = new Queue();
queue.enqueue(5);
queue.enqueue(5);
queue.enqueue(5);
queue.enqueue(5);
queue.enqueue(5);
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue);
console.log(queue.size());
console.log(queue.peek());

//연결 리스트로 queue 구현하기.

//shift 함수는 성능상 이슈가 크므로 쓰지 않도록한다.
