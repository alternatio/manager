import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../../../data/sessionsData'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import cross from '/public/icons/cross.svg'
import Column from '../Column/Column'
import { addItemToData } from '../../../functions/addBlocks'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { cubicBezier } from 'popmotion'
import HeaderTable from './HeaderTable'

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
      maxHeight: '80vh',
    },
    hidden: {
      maxHeight: '0vh',
    },
  }

  return (
    <div className={style.table}>
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
            transition={{ type: cubicBezier(0.35, 0.35, 0.5, 1), duration: 1 }}
            variants={tableVariants}
            className={style.tableMain}
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
                    index={index}/>
                )
              })}
              <div
                onClick={() => {
                  addItemToData(setColumns, columns)
                }}
                className={style.addColumn}
              >
                <Image className={style.icon} src={cross} alt={'cross'} />
                <span>Добавить Колонку</span>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
})

export default Table
