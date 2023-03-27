function solution(html) {
  const openTags = html.match(/<+[a-z]+>/gi);
  const closingTags = html.match(/<+\/[a-z]+>/gi);

  if (openTags === null && closingTags === null) return true;
  if (openTags === null && closingTags !== null) return false;
  if (openTags !== null && closingTags === null) return false;

  if (openTags.length !== closingTags.length) return false;
  closingTags.reverse();

  for (let i = 0; i < openTags.length; i++) {
    const openStr = openTags[i].slice(1, openTags[i].length - 1);
    const closeStr = closingTags[i].slice(2, closingTags[i].length - 1);
    if (openStr !== closeStr) return false;
  }

  return true;
}
