//rear는 끝.
//enqueue 추가
//dequeue 삭제
//front는 앞.
//array에서 queue를 구현하면, array의 길이보다 queue가 길어질 수 있다. (javascript는 알아서 증감되므로 상관없음. 하지만 rear, front가 무한대가 될 수 있음.)
//무한대가 안되기 위해서는, 배열을 앞당기는 작업이 필요한데 이는 선형시간이 소요됨.
//shift 함수는 성능상 이슈가 크므로 쓰지 않도록한다.

//array는 구현이 간단하므로 코딩테스트 할 때 추천한다.
class ArrayQueue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  peek() {
    return this.queue[this.front];
  }

  size() {
    return this.rear - this.front;
  }
}

const queue = new ArrayQueue();
queue.enqueue(10);
queue.enqueue(10);
queue.enqueue(10);
queue.dequeue();
console.log(queue.peek());
console.log(queue);

class ListQueue {}
