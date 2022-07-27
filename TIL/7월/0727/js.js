const obj = {
  cnt: 0,
  getCandy() {
    this.cnt++;
    return this.cnt;
  },
};

const oldObj = {
  cnt: 0,
  getCandy: function () {
    console.log(this);
    this.cnt++;
    return this.cnt;
  },
};

console.log(oldObj.getCandy());

// const r = obj.getCandy();
// console.log(r);

// const { getCandy, cnt } = obj;
// console.log(getCandy());
//새로운 변수에 할당되었기 때문에..

const date = new Date();
console.log(date);
