import {
  sessionDataBlockI,
  sessionDataColumnI,
  sessionDataTableI,
  sessionsDataI,
} from '../../../data/sessionsData'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Column from '../../components/Column/Column'
import { AnimatePresence, AnimateSharedLayout, motion, Variants } from 'framer-motion'
import { cubicBezier } from 'popmotion'
import HeaderTable from './HeaderTable'
import ButtonAddColumn from '../../ui/Buttons/ButtonAddColumn'
import EditField from '../../components/EditField/EditField'

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
  const [blockIdEdit, setBlockIdEdit] = useState<string>('')

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
        id={props.id}
      />
      <AnimateSharedLayout>
        <EditField
          blockId={blockIdEdit}
          blocks={blocks}
          setBlocks={setBlocks}
          setBlockIdEdit={setBlockIdEdit}
          columns={columns}
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
            >
              <motion.div className={style.tableMainInner} layout={'size'}>
                {columns.map((column, index) => {
                  let corner: 'left' | 'right' | 'none' | null = null
                  if (index === 0) {
                    corner = 'left'
                  }
                  if (index === columns.length - 1 && columns.length !== 1) {
                    corner = 'right'
                  }
                  if (index === 0 && (index === columns.length - 1)) {
                    corner = 'none'
                  }
                  console.log(columns.length)
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
                      columns={columns}
                      corner={corner}
                      // forceUpdate={forceUpdateTable}
                      setColumns={setColumns}
                      position={index}
                    />
                  )
                })}
                <ButtonAddColumn columns={columns} setColumns={setColumns} />
              </motion.div>
            </motion.main>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </motion.div>
  )
})

Table.displayName = 'Table'
export default Table
