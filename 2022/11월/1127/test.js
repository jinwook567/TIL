const delay = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("iam waiting");
    resolve();
  }, 3000);
});

async function solution() {
  const timer = setTimeout(() => {
    console.log("hi");
    throw new Error("error");
  }, 1000);
  await delay;
  //   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  //   const json = response.json();

  clearTimeout(timer);
  //   return json;
}

solution();
