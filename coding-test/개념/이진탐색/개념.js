function binarySearch(array, value) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (array[mid] === value) return mid;

    if (array[mid] > value) {
      end = mid - 1;
      //mid는 비교할 필요가 없으므로.
    } else {
      start = mid + 1;
    }
  }

  return -1;
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      const node = new Node(value);
      this.root = node;
      return;
    }

    let current = this.root;
    const node = new Node(value);

    while (current) {
      if (current.value === value) return "동일한 값은 존재할 수 없습니다.";
      //리프 트리까지 가야해.

      if (current.value < value) {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      } else {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      }
    }

    //나는 지금 그냥 null이야.
  }

  has(value) {
    let current = this.root;
    while (current) {
      if (current.value === value) return true;
      if (current.value < value) {
        //오른쪽 이동
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return false;
  }
}

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(10);
binarySearchTree.insert(11);
binarySearchTree.insert(12);
console.log(binarySearchTree.has(13));
console.log(binarySearchTree);
