function solution(word, pages) {
  const getSiteUrl = (page) => {
    const site = page.match(/[<meta\s]+content=["']https:\/\/[\w.-\/\@\?\#]+["']/gi)[0];
    const sliced = site.slice(9);
    return sliced.slice(1, sliced.length - 1);
  };

  const getLinks = (body) => {
    const links = body.match(/<a href=["']https:\/\/[\w.-\/\@\?\#]+["']/gi);
    if (!links) return [];
    return links.map((raw) => {
      const link = raw.match(/["']https:\/\/[\w.-\/\@\?\#]+["']/gi)[0];
      return link.slice(1, link.length - 1);
    });
  };

  const getBody = (page) => {
    const body = page.match(/<body>+[\d\D]*<\/body>+/gi)[0];
    return body;
  };

  const data = pages.map((page) => {
    const body = getBody(page);
    const links = getLinks(body);

    const regex = new RegExp(`${word}`, "gi");
    const words = body.match(regex);

    const linkWordCnt = links.reduce((acc, cur) => {
      const temp = cur.match(regex);
      if (temp) acc += temp.length;
      return acc;
    }, 0);

    const defaultScore = words.length - linkWordCnt;

    return { site: getSiteUrl(page), links, defaultScore, externalScore: 0 };
  });

  data.forEach((v) => {
    v.links.forEach((link) => {
      const obj = data.find((el) => el.site === link);
      if (obj) {
        obj.externalScore += v.defaultScore / v.links.length;
      }
    });
  });
  console.log(data);
  const result = data.map((v, index) => ({ index, score: v.defaultScore + v.externalScore }));
  result.sort((a, b) => {
    if (a.score === b.score) return a.index - b.index;
    return b.score - a.score;
  });

  return result[0].index;
}

const word = "Muzi";
const pages = [
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
];

const r = solution(word, pages);
console.log(r);
