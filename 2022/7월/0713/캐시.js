function solution(cacheSize, cities) {
  const map = new Map();
  let count = 0;
  cities = cities.map((s) => [...s].map((v) => v.toLowerCase()).join(""));

  if (cacheSize === 0) return cities.length * 5;

  for (let i = 0; i < cities.length; i++) {
    if (map.has(cities[i])) {
      map.set(cities[i], i);
      count += 1;
      continue;
    }

    if (map.size < cacheSize) {
      map.set(cities[i], i);
      count += 5;
    } else {
      //LRU 알고리즘
      let minKey;
      let min = Infinity;

      for (let [key, value] of map) {
        min = Math.min(min, value);
        if (min === value) {
          minKey = key;
        }
      }

      map.delete(minKey);
      map.set(cities[i], i);
      count += 5;
    }
  }
  return count;
}

const citi1 = ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"];
const citi2 = [
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
];
const r = solution(3, citi1);

console.log(r);
