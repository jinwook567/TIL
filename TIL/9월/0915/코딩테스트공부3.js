function solution(alp, cop, problems) {
  const t_alp = Math.max(...problems.map((v) => v[0]));
  const t_cop = Math.max(...problems.map((v) => v[1]));

  const d = Array(152)
    .fill()
    .map((_) => Array(152).fill(Infinity));

  alp = Math.min(alp, t_alp);
  cop = Math.min(cop, t_cop);
  d[alp][cop] = 0;

  for (let i = alp; i <= t_alp; i++) {
    for (let j = cop; j <= t_cop; j++) {
      d[i][j + 1] = Math.min(d[i][j + 1], d[i][j] + 1);
      d[i + 1][j] = Math.min(d[i + 1][j], d[i][j] + 1);

      problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
        if (i >= alp_req && j >= cop_req) {
          const n_alp = i + alp_rwd > t_alp ? t_alp : i + alp_rwd;
          const n_cop = j + cop_rwd > t_cop ? t_cop : j + cop_rwd;
          d[n_alp][n_cop] = Math.min(d[n_alp][n_cop], d[i][j] + cost);
        }
      });
    }
  }

  return d[t_alp][t_cop];
}

const alp = 0;
const cop = 0;
const problems = [
  [0, 0, 2, 1, 2],
  [4, 5, 3, 1, 2],
  [4, 11, 4, 0, 2],
  [10, 4, 0, 4, 2],
];
const r = solution(alp, cop, problems);
console.log(r);
