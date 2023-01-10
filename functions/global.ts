
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

/*
  colors for function getRandomColor
*/
const colors: string[] = [
  '#ffee00',
  '#ff0033',
  '#0011ff',
  '#ff6600',
  '#00ffaa',
  '#ff0088',
  '#000'
]

const preGenerateColors: string[] = [
  'ff',
  '00',
  '88'
]

/*
  get random color
  isFullRandom - ignoring an array of colors and generating full random colors
*/
export const getRandomColor = (
  arrayOfColors: string[] = colors,
  isFullRandom: boolean = false,
  generateColorsArray: string[] = preGenerateColors
): string => {
  let result = ''
  if (isFullRandom) {
    result += '#'
    for (let i = 0; i < 3; i++)
      result += generateColorsArray[getRandomNumber(0, generateColorsArray.length - 1)]
  } else {
    result = arrayOfColors[getRandomNumber(0, arrayOfColors.length - 1)]
  }
  return result
}


const randomText = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Fuga, maxime nulla!',
  'Accusamus, animi deserunt enim est et ex facilis molestiae nulla odio optio quae quas rerum similique sit tenetur.',
  'Reiciendis!'
]

export const getRandomText = (length: number = 10): string => {
  let result = ''
  for (let i = 0; i <= length; i++)
    result += randomText[getRandomNumber(0, randomText.length - 1)] + ' '
  return result
}