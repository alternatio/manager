import { Dispatch, SetStateAction } from 'react'
import { getCurrentDate, getRandomColor, getRandomId } from './global'
import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../data/sessionsData'

export const addItem = (
  setData: Dispatch<SetStateAction<sessionsDataI[] | sessionDataTableI[]>>,
  data: any[],
  title: string = 'Table'
) => {
  const id = getRandomId(4)
  if (data.filter((obj) => obj.id === id).length === 0) {
    setData((prevState) => [...prevState, { id, title }])
  }
}

export const addColumn = (
  setData: Dispatch<SetStateAction<sessionDataColumnI[]>>,
  data: sessionDataColumnI[],
  title: string = 'Column'
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
  status: number,
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
  const resultData = [...data]
  resultData.find((item) => item.id === id).title = title
  setData(resultData)
}

// swap status of block
export const swapStatus = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  direction: 'left' | 'right',
  id: string
) => {
  const resultData = [...data]
  // @ts-ignore
  resultData.find((block) => block.id === id).status += direction === 'left' ? -1 : 1
  setData(resultData)
}
