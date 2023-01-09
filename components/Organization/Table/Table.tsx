import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../../../data/sessionsData'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Column from '../Column/Column'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { cubicBezier } from 'popmotion'
import HeaderTable from './HeaderTable'
import ButtonAddColumn from '../Buttons/ButtonAddColumn'

interface TableI extends sessionDataTableI {
  id: string
  title: string
  index: number
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const Table: FC<TableI> = memo((props) => {
  const [menuIsOpen, handleMenu] = useState<boolean>(false)
  const [renameTitle, handleRenameTitle] = useState<boolean>(false)
  const [tableIsOpen, handleTableOpen] = useState<boolean>(true)
  const [columns, setColumns] = useState<sessionDataColumnI[]>([])
  const [blocks, setBlocks] = useState<sessionDataBlockI[]>([])

  const tableVariants: Variants = {
    visible: {
      height: 'auto',
      opacity: 1,
      transform: 'scaleX(1)',
    },
    hidden: {
      height: '0',
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
        handleMenu={handleMenu}
        handleRenameTitle={handleRenameTitle}
        handleTableOpen={handleTableOpen}
        menuIsOpen={menuIsOpen}
        renameTitle={renameTitle}
      />
      <AnimatePresence>
        {tableIsOpen && (
          <motion.main
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            transition={{ type: cubicBezier(0.35, 0.35, 0.5, 1), duration: 0.75 }}
            variants={tableVariants}
            className={style.tableMain}
            layout={'size'}
          >
            <div className={style.tableMainInner}>
              {columns.map((column, index) => {
                return (
                  <Column
                    key={index}
                    id={column.id}
                    title={column.title}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    index={index}
                  />
                )
              })}
              <ButtonAddColumn columns={columns} setColumns={setColumns}/>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

export default Table
