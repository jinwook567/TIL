const expression = "100-200*300-500+20";

const result = expression.split(/[^0-9]/);
const opArr = expression.match(/[\+\-\*]/g);

console.log(opArr);
//match는 원하는 것만 뽑아올 수 있는 것이군.

console.log(result);

console.log(expression[3]);
