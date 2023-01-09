import { Dispatch, SetStateAction } from 'react'
import { getRandomColor, getRandomId } from './global'
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
  const tryAddBlock = () => {
    const id = getRandomId(4)
    const addBlock = () => {
      if (data.filter((obj) => obj.id === id).length === 0) {
        setData((prevState) => [...prevState, { id, title }])
      }
    }
    addBlock()
  }

  tryAddBlock()
}

// add block
export const addBlock = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  status: number = 0,
  color: string = getRandomColor(),
  title: string = 'Block',
  isRequired: boolean = false,
  isUrgent: boolean = false,
  text: string = ''
) => {
  const tryAddBlock = () => {
    const id = getRandomId(4)
    const addBlock = () => {
      if (data.filter((obj) => obj.id === id).length === 0) {
        setData((prevState) => [...prevState, { id, title, status, isRequired, isUrgent, text, color }])
      }
    }
    addBlock()
  }

  tryAddBlock()
}
