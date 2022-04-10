//내 풀이
function solution(id_list, report, k) {
  const reportedList = {};
  const reportingList = {};

  for (let data of report) {
    const [reporting, reported] = data.split(" ");
    if (reportedList[reported]) {
      reportedList[reported].add(reporting);
    } else {
      reportedList[reported] = new Set([reporting]);
    }
  }

  for (let key in reportedList) {
    const item = reportedList[key];
    if (item.size >= k) {
      for (let name of item) {
        reportingList[name] = reportingList[name] ? reportingList[name] + 1 : 1;
      }
    }
  }

  const answer = id_list.map((name) => {
    return reportingList[name] ? reportingList[name] : 0;
  });

  return answer;
}
// * 요약
//map의 개념이 명확하지 않아서 사용하지 않았다. 중복 제거를 위해 Set을 이용하였다.

// * 리팩토링
function solution(id_list, report, k) {}
