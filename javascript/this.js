const obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc();
    //이 때 this는 전역객체임. 함수로써 사용되었음. 메소드가 아니라. 그러면 무조건 전역객체임.

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
    //이 때 this는 obj2임.
  },
};

obj.outer();

//콜백 함수 내부에서의 this
function callback() {
  console.log("callback this", this);
}

function func(callback) {
  callback();
}
//func(callback);
//global 객체를 가르킴.

const obj2 = {
  func: function (callback) {
    const obj3 = {
      callback: callback,
    };
    return obj3.callback();
  },
};

obj2.func(callback);

const obj3 = {
  func: function (callback) {
    console.log("func this", this);
    //this는 객체를 나타내는데 비해서, 콜백은 전역 객체를 가르킨다.
    callback();
  },
};
obj3.func(callback);

const callback2 = function (coffee, desert) {
  const value = coffee + desert;
  console.log(this);
  console.log(value);
  return value;
};

const timer = setTimeout(callback2, 500, "americano", "cake");
