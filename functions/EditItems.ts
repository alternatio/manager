import { Dispatch, SetStateAction } from 'react'
import { getCurrentDate, getRandomColor, getRandomId } from './global'
import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../data/sessionsData'

// add item (table or column)
export const addItemToData = (
  setData: Dispatch<SetStateAction<sessionsDataI[] | sessionDataTableI[] | sessionDataColumnI[]>>,
  data: any[],
  title: string = 'Common'
) => {
  const id = getRandomId(4)
  if (data.filter((obj) => obj.id === id).length === 0) {
    setData((prevState) => [...prevState, { id, title }])
  }
}

// add block
export const addBlock = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  status: string,
  color: string = getRandomColor(),
  title: string = 'Block',
  isRequired: boolean = false,
  isUrgent: boolean = false,
  text: string = '',
  dateToComplete: string = ''
) => {
  if (!dateToComplete) dateToComplete = getCurrentDate()

  const id = getRandomId(4)
  if (data.filter((obj) => obj.id === id).length === 0) {
    setData((prevState) => [
      ...prevState,
      { id, title, status, isRequired, isUrgent, text, color, dateToComplete },
    ])
  }
}

// delete item
export const deleteItem = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  id: string
) => {
  const resultData: sessionDataBlockI[] = []
  data
    .filter((obj) => obj.id !== id)
    .forEach((item) => {
      resultData.push(item)
    })
  setData(resultData)
}

// rename item
export const renameItem = (
  setData: Dispatch<SetStateAction<any[]>>,
  data: any[],
  id: string,
  title: string
) => {
  // const resultData = data.map((item) => {
  //       if (item.id === id) {
  //         return {
  //           ...item,
  //           title: title,
  //         }
  //       } else {
  //         return item
  //       }
  //     })

  const resultData = data

  resultData.forEach(item => {
    if (item.id === id) {
      item.title = title
    }
  })

  setData(
    resultData
  )
}

// swap status of block
export const swapStatus = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  columns: sessionDataColumnI[],
  direction: 'left' | 'right',
  id: string,
  status: string
) => {
  let indexOfSelectedColumn
  let idOfSelectedColumn: string = ''
  let currentBlock: sessionDataBlockI | undefined
  let resultData: sessionDataBlockI[] = JSON.parse(JSON.stringify(data))

  columns.map((column, index) => {
    if (column.id === status) {
      indexOfSelectedColumn = index
    }
  })

  const getCurrentBlock = () => {
    currentBlock = resultData.find((block) => block.id === id)
    if (currentBlock) {
      console.log(currentBlock.status, idOfSelectedColumn)
      currentBlock.status = idOfSelectedColumn
    }
  }

  const swapBlock = () => {
    console.log(resultData)
    setData(resultData)
  }

  console.log(indexOfSelectedColumn)

  if (typeof indexOfSelectedColumn === 'number') {
    if (direction === 'left' && columns[indexOfSelectedColumn - 1]) {
      idOfSelectedColumn = columns[indexOfSelectedColumn - 1].id
      getCurrentBlock()
      swapBlock()
    }
    if (direction === 'right' && columns[indexOfSelectedColumn + 1]) {
      idOfSelectedColumn = columns[indexOfSelectedColumn + 1].id
      getCurrentBlock()
      swapBlock()
    }
  } else {
    console.log('indexOfSelectedColumn = 0')
  }
}
