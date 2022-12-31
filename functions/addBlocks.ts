import { Dispatch, SetStateAction } from 'react'
import { getRandomId } from './global'
import { sessionDataBlockI, sessionDataColumnI, sessionDataTableI } from '../data/sessionsData'

export class addBlocks {
  // add attempts
  public static addAttempts = (attempts: number, tryAddBlock: Function) => {
    attempts += 1
    console.log(`attempts: ${attempts}`)
    tryAddBlock()
  }

  // and check attempts
  public static checkAttempts = (attempts: number, addBlock: Function) => {
    if (attempts <= 20) {
      addBlock()
    } else {
      this.consoleError()
    }
  }

  // console error
  private static consoleError = () => {
    console.log('Error, block not created (the maximum number of blocks exceeded)')
  }
}

// add item (table or column)
export const addItemToData = (
  setData: Dispatch<SetStateAction<sessionDataTableI[] | sessionDataColumnI[]>>,
  data: any[],
  title: string = 'Common'
) => {
  let attempts = 0

  const tryAddBlock = () => {
    const id = getRandomId(2)
    const addBlock = () => {
      if (data.filter((obj) => obj.id === id).length === 0) {
        setData((prevState) => [...prevState, { id, title }])
      } else {
        addBlocks.addAttempts(attempts, tryAddBlock)
      }
    }
    addBlocks.checkAttempts(attempts, addBlock)
  }

  tryAddBlock()
}

// add block
export const addBlock = (
  setData: Dispatch<SetStateAction<sessionDataBlockI[]>>,
  data: sessionDataBlockI[],
  title: string = 'Block',
  isRequired: boolean = false,
  isUrgent: boolean = false,
  text: string = '',
  status: number = 0
) => {
  let attempts = 0

  const tryAddBlock = () => {
    const id = getRandomId(2)
    const addBlock = () => {
      if (data.filter((obj) => obj.id === id).length === 0) {
        setData((prevState: any) => [
          ...prevState,
          { id, title, status, isRequired, isUrgent, text },
        ])
      } else {
        addBlocks.addAttempts(attempts, tryAddBlock)
      }
    }
    addBlocks.checkAttempts(attempts, addBlock)
  }

  tryAddBlock()
}
