function solution(table, lanuages, preference) {
  let myJob = "SI";
  let maxScore = 0;

  table.sort((a, b) => (a[0] > b[0]) - (a[0] < b[0]));

  table.forEach((el) => {
    const array = el.split(" ");
    const job = array[0];
    let score = 0;

    lanuages.forEach((lan, i) => {
      const index = array.findIndex((v) => v === lan);
      if (index !== -1) score += (6 - index) * preference[i];
    });

    maxScore = Math.max(maxScore, score);
    if (maxScore === score) myJob = job;
  });

  return myJob;
}

const table = [
  "SI JAVA JAVASCRIPT SQL PYTHON C#",
  "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++",
  "HARDWARE C C++ PYTHON JAVA JAVASCRIPT",
  "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP",
  "GAME C++ C# JAVASCRIPT C JAVA",
];

const lanuages = ["PYTHON", "C++", "SQL"];
const preference = [7, 5, 5];
const r = solution(table, lanuages, preference);
console.log(r);
