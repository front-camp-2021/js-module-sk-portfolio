export const cutStrings = (arr = []) => {
  const lengthArr = arr.map(str => str.length)
  const minLength = Math.min(...lengthArr)
  return arr.map(str => str.substring(0, minLength))
}
