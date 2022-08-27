function solution(alp, cop, problems) {
  let maxAlq = 0;
  let maxCop = 0;
  problems.forEach(([alp_req, cop_req]) => {
    maxAlq = Math.max(maxAlq, alp_req);
    maxCop = Math.max(maxCop, cop_req);
  });

  problems.push([0, 0, 1, 0, 1]);
  problems.push([0, 0, 0, 1, 1]);
}

const r = solution(alp, cop, problems);
console.log(r);
