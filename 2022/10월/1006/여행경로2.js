const findMatchTickets = (start, tickets) => {
  const result = [];
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i][0] === start) {
      result.push({ i, end: tickets[i][1] });
    }
  }
  result.sort((a, b) => (a.end > b.end) - (a.end < b.end));
  return result;
};

function solution(tickets) {
  let answer = null;

  function dfs(leftTickets, lastVisited, path) {
    if (answer) return;
    if (leftTickets.length === 0) {
      answer = path;
    }

    findMatchTickets(lastVisited, leftTickets).forEach(({ i, end }) => {
      dfs(
        leftTickets.filter((_, index) => index !== i),
        end,
        [...path, end]
      );
    });
  }
  dfs(tickets, "ICN", ["ICN"]);
  return answer;
}

const tickets = [
  ["ICN", "SFO"],
  ["ICN", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "ICN"],
  ["ATL", "SFO"],
];
const r = solution(tickets);
console.log(r);
