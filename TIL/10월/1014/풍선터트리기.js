function solution(a) {
  const linkedList = { data: a[0] };
  let current = linkedList;
  let first = linkedList;

  for (let i = 1; i < a.length; i++) {
    current.next = { data: a[i] };
    current = current.next;
  }

  current = first;
  let before = null;

  for (let i = 0; i < a.length; i++) {
    if (!current.next) continue;
    const currentValue = current.data;
    const nextValue = current.next.data;

    if (currentValue > nextValue) {
      if (!before) {
        first = current.next;
      } else {
        before.next = current.next;
      }
    }
    before = current;
  }

  console.log(first);
}

const a = [9, -1, -5];
const r = solution(a);
console.log(r);
