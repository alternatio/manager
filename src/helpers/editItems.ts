import { Dispatch, SetStateAction } from 'react'
import { getCurrentDate, getRandomColor, getRandomId } from './global'
import {
  sessionDataBlockILegacy,
  sessionDataColumnILegacy,
  sessionDataTableILegacy,
  sessionsDataILegacy,
} from '../../data/sessionsData'

export const addItem = (
  setData: Dispatch<SetStateAction<sessionsDataILegacy[] | sessionDataTableILegacy[]>>,
  data: any[],
  title: string = 'Table'
) => {
  const id = getRandomId(4)
  if (data.filter((obj) => obj.id === id).length === 0) {
    setData((prevState) => [...prevState, { id, title }])
  }
}

export const addColumn = (
  setData: Dispatch<SetStateAction<sessionDataColumnILegacy[]>>,
  data: sessionDataColumnILegacy[],
  title: string = 'Column'
) => {
  const id = getRandomId(4)
  if (data.filter((obj) => obj.id === id).length === 0) {
    setData((prevState) => [...prevState, { id, title }])
  }
}

// add block
export const addBlock = (
  setData: Dispatch<SetStateAction<sessionDataBlockILegacy[]>>,
  data: sessionDataBlockILegacy[],
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
export const deleteBlock = (
  setData: Dispatch<SetStateAction<sessionDataBlockILegacy[]>>,
  data: sessionDataBlockILegacy[],
  id: string
) => {
  const resultData = data.filter((block) => block.id !== id)
  setData(resultData)
}

export const deleteColumn = (
  setColumns: Dispatch<SetStateAction<sessionDataColumnILegacy[]>>,
  columns: sessionDataColumnILegacy[],
  id: string,
  setBlocks: Dispatch<SetStateAction<sessionDataBlockILegacy[]>>,
  blocks: sessionDataBlockILegacy[]
) => {
  const resultColumns = columns.filter((column) => column.id !== id)
  const resultBlocks = blocks.filter((block) => block.status !== id)
  setBlocks(resultBlocks)
  setColumns(resultColumns)
}

export const deleteTable = (
  setTables: Dispatch<SetStateAction<sessionDataTableILegacy[]>>,
  tables: sessionDataTableILegacy[],
  id: string
) => {
  const resultTables = tables.filter((table) => table.id !== id)
  setTables(resultTables)
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
  setData: Dispatch<SetStateAction<sessionDataBlockILegacy[]>>,
  data: sessionDataBlockILegacy[],
  direction: 'left' | 'right',
  id: string,
  columns: sessionDataColumnILegacy[]
) => {
  const resultData = [...data]
  const currentStatusOfBlock: string | undefined = resultData.find(
    (block) => block.id === id
  )?.status
  let currentIndexOfColumn = columns.findIndex(column => column.id === currentStatusOfBlock)
  const nextStatusOfColumn = columns[currentIndexOfColumn + (direction === 'left' ? -1 : 1)].id

  // @ts-ignore
  resultData.find(block => block.id === id).status = nextStatusOfColumn

  console.log(currentIndexOfColumn, nextStatusOfColumn, currentStatusOfBlock)

  setData(resultData)
}
