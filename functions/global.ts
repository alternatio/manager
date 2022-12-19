
/*
  value = min >= <= max
*/
export const getRandomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

/*
  number of chars = 16
  range
  49 - 57 (1 - 9)
  65 - 90 (A - Z)
  97 - 122 (a - z)
*/
export const getRandomId = (
  numberOfChars: number = 16,
  range: number[][] = [[49, 57], [65, 90], [97, 122]],
  getQuantityOfId: boolean = false
): string => {
  let result: string = ''

  while(result.length < numberOfChars) {
    const innerRange = range[getRandomNumber(0, range.length - 1)]
    const value = getRandomNumber(innerRange[0], innerRange[1])
    result += String.fromCharCode(value)
  }

  if (getQuantityOfId) {
    let result = 0
    for (const innerRange of range) {
      result += innerRange[1] - innerRange[0]
    }
    result **= numberOfChars
    console.log(`quantity of id: ${result}`)
  }

  return result
}

