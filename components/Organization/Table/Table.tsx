import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../../../data/sessionsData'
import { Dispatch, FC, memo, SetStateAction, useReducer, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Column from '../Column/Column'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { cubicBezier } from 'popmotion'
import HeaderTable from './HeaderTable'
import ButtonAddColumn from '../Buttons/ButtonAddColumn'
import EditField from '../EditField/EditField'

interface TableI extends sessionDataTableI {
  id: string
  title: string
  index: number
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const Table: FC<TableI> = memo((props) => {
  const [popupIsOpen, handlePopup] = useState<boolean>(false)
  const [tableIsOpen, handleTableOpen] = useState<boolean>(true)
  const [columns, setColumns] = useState<sessionDataColumnI[]>([])
  const [blocks, setBlocks] = useState<sessionDataBlockI[]>([])
  const [, forceUpdateTable] = useReducer(x => x + 1, 0)
  const [blockIdEdit, setBlockIdEdit] = useState<string>('')
  const [search, handleSearch] = useState<boolean>(false)

  const tableVariants: Variants = {
    visible: {
      height: '70vh',
      opacity: 1,
      transform: 'scaleX(1)',
    },
    hidden: {
      height: '0vh',
      opacity: 0,
      transform: 'scaleX(.95)',
    },
  }

  return (
    <motion.div initial={{ height: '0' }} animate={{ height: 'auto' }} className={style.table}>
      <HeaderTable
        data={props.data}
        index={props.index}
        setData={props.setData}
        handlePopup={handlePopup}
        handleTableOpen={handleTableOpen}
        popupIsOpen={popupIsOpen}
        tableIsOpen={tableIsOpen}
      />
      <EditField blockId={blockIdEdit} blocks={blocks} setBlocks={setBlocks} setBlockIdEdit={setBlockIdEdit}/>
      <AnimatePresence>
        {tableIsOpen && (
          <motion.main
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            transition={{ type: cubicBezier(0.35, 0.35, 0.5, 1), duration: 0.75 }}
            variants={tableVariants}
            className={style.tableMain}
          >
            <div
              className={style.tableMainInner}>
              {columns.map((column, index) => {
                return (
                  <Column
                    key={index}
                    id={column.id}
                    title={column.title}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    index={index}
                    blockIdEdit={blockIdEdit}
                    setBlockIdEdit={setBlockIdEdit}
                  />
                )
              })}
              <ButtonAddColumn columns={columns} setColumns={setColumns} />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

Table.displayName = 'Table'
export default Table
