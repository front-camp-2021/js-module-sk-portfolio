export const weirdString = (str = "") => {
  if(str === '') return str
  const strUppercase = str.toUpperCase()
  const strUppercaseArr = strUppercase.split(' ')
  return strUppercaseArr.map(word =>  word.slice(0, -1) + word.slice(-1).toLowerCase()).join(' ')
}

