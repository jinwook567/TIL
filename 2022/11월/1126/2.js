function solution(record) {
  record = record.map((v) => {
    const [name, time] = v.split(":");
    return [name, time.split(",").map((el) => Number(el))];
  });

  const medalObj = {};
  record.forEach(([name]) => {
    medalObj[name] = {
      gold: 0,
      silver: 0,
      bronze: 0,
    };
  });

  for (let i = 0; i < 5; i++) {
    const timeRecord = [];
    record.forEach(([name, r]) => {
      if (r[i] !== 0) {
        timeRecord.push({ name, r: r[i] });
      }
    });
    timeRecord.sort((a, b) => a.r - b.r);
    const goldIndex = Math.ceil(timeRecord.length / 12);
    const silverIndex = Math.ceil(timeRecord.length / 4);
    const bronzeIndex = Math.ceil(timeRecord.length / 2);
    for (let i = 0; i < timeRecord.length; i++) {
      if (i < goldIndex) medalObj[timeRecord[i].name].gold += 1;
      if (i >= goldIndex && i < silverIndex) medalObj[timeRecord[i].name].silver += 1;
      if (i >= silverIndex && i < bronzeIndex) medalObj[timeRecord[i].name].bronze += 1;
    }
  }

  return record.sort(compare).map((v) => v[0]);
}

function compare(a, b) {
  const complete_a = a[1].filter((v) => v !== 0).length;
  const complete_b = b[1].filter((v) => v !== 0).length;
  if (complete_a === complete_b) {
    const high_a = Math.max(...a[1]);
    const high_b = Math.max(...b[1]);
    if (high_a === high_b) {
      if (medalObj[a[0]].gold === medalObj[b[0]].gold) {
        if (medalObj[a[0]].silver === medalObj[b[0]].silver) {
          if (medalObj[a[0]].bronze === medalObj[b[0]].bronze) {
            const sum_a = a[1].reduce((acc, cur) => acc + cur, 0);
            const sum_b = b[1].reduce((acc, cur) => acc + cur, 0);
            if (sum_a === sum_b) {
              return a.name - b.name;
            } else {
              return sum_a > sum_b ? b - a : a - b;
            }
          } else {
            return medalObj[a[0]].bronze > medalObj[b[0]].bronze ? b - a : a - b;
          }
        } else {
          return medalObj[a[0]].silver > medalObj[b[0]].silver ? b - a : a - b;
        }
      } else {
        return medalObj[a[0]].gold > medalObj[b[0]].gold ? b - a : a - b;
      }
    } else {
      return high_a > high_b ? b - a : a - b;
    }
  } else {
    return complete_a > complete_b ? b - a : a - b;
  }
}
