const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const main = async () => {
  console.log("start");
  const result = delay(1000);
  result
    .then((r) => {
      console.log("after 1000");
      return new Promise((resolve) => setTimeout(resolve, 3000));
    })
    .then(() => {
      console.log("after 3000");
    });
  console.log("end");
};

const main2 = async () => {
  console.log("start");
  const result = await delay(1000);
  console.log("end");
};

//main();
main2();
