export const splitAndMerge = (str = "", separator = "") => {
  const wordsArr = str.split(' ')
  const seperatedWordsArr = wordsArr.map(word => [...word].join(separator))
  return seperatedWordsArr.join(' ')
};
