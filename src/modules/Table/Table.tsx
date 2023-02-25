import { FC, memo, useEffect, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Column from '../../components/Column/Column'
import { AnimatePresence, AnimateSharedLayout, motion, Variants } from 'framer-motion'
import { cubicBezier } from 'popmotion'
import HeaderTable from './HeaderTable'
import ButtonAddColumn from '../../ui/Buttons/ButtonAddColumn'
import EditField from '../../components/EditField/EditField'
import { sessionInterface, tableInterface } from '../../helpers/interfaces'

interface TableI {
  id: string
  title: string
  index: number
  session: sessionInterface
}

const Table: FC<TableI> = memo((props) => {
  const [popupIsOpen, handlePopup] = useState<boolean>(false)
  const [tableIsOpen, handleTableOpen] = useState<boolean>(false)
  const [blockIdEdit, setBlockIdEdit] = useState<string>('')

  const tableIsOpenLocalName = `table${props.id}TableIsOpen`

  const getLocalData = () => {
    const rawTableIsOpen = localStorage.getItem(tableIsOpenLocalName)
    if (rawTableIsOpen) {
      const tableIsOpen = JSON.parse(rawTableIsOpen) as boolean
      handleTableOpen(tableIsOpen)
    }
  }

  useEffect(() => {
    getLocalData()
  }, [])

  const handleTableIsOpenWithSave = (value: boolean) => {
    handleTableOpen(value)
    localStorage.setItem(tableIsOpenLocalName, JSON.stringify(value))
  }

  const sessionColumns = props.session.tables[props.index]?.columns

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
        index={props.index}
        handlePopup={handlePopup}
        handleTableOpen={handleTableIsOpenWithSave}
        popupIsOpen={popupIsOpen}
        tableIsOpen={tableIsOpen}
        id={props.id}
        session={props.session}
      />
      <AnimateSharedLayout>
        <EditField
          blockId={blockIdEdit}
          setBlockIdEdit={setBlockIdEdit}
          session={props.session}
          indexOfTable={props.index}
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
                {sessionColumns &&
                  sessionColumns.map((column, index) => {
                    let corner: 'left' | 'right' | 'none' | null = null
                    if (index === 0) {
                      corner = 'left'
                    }
                    if (index === sessionColumns.length - 1 && sessionColumns.length !== 1) {
                      corner = 'right'
                    }
                    if (index === 0 && index === sessionColumns.length - 1) {
                      corner = 'none'
                    }
                    return (
                      <Column
                        key={index}
                        id={column.id}
                        title={column.title}
                        index={index}
                        blockIdEdit={blockIdEdit}
                        setBlockIdEdit={setBlockIdEdit}
                        corner={corner}
                        position={index}
                        indexOfTable={props.index}
                        session={props.session}
                      />
                    )
                  })}
                <ButtonAddColumn session={props.session} indexOfTable={props.index} />
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
