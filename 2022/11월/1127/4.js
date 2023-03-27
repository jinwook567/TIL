function solution(id) {
  const id_cnt = id.length;
  const masking_cnt = Math.floor(id_cnt / 2);
  const masking_start =
    (id_cnt - masking_cnt) % 2 === 0
      ? Math.ceil((id_cnt - 1 - masking_cnt) / 2)
      : Math.floor((id_cnt - 1 - masking_cnt) / 2);

  id = [...id];

  for (let i = masking_start; i < masking_start + masking_cnt; i++) {
    id[i] = "*";
  }
  return id.join("");
}

const id = "da2ssb3v";

// const id = "hcmsjfb2e5";
const r = solution(id);
console.log(r);
