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
  const resultData: any[] = data
  resultData.map((item) => {
    if (item.id === id) {
      item.title = title
    }
  })
  console.log(resultData)
  setData(resultData)
}
