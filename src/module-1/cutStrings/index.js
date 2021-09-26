export const cutStrings = (arr = [], strLength = 0) => {
  if(strLength <= 0) {
    const lengthArr = arr.map(str => str.length)
    strLength = Math.min(...lengthArr)
  }
  return arr.map(str => str.substring(0, strLength))
}
cutStrings(["adfg", "bkfkdl", "cdfffk", "dgldssvv"], 4)
