import { Dispatch, FC, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { KebabButton } from '../../ui/Kebab/Kebab'
import style from '/styles/pages/Organization.module.scss'

import Block from '../Block/Block'
import ButtonAddBlock from '../../ui/Buttons/ButtonAddBlock'
import Popup from '../Popups/smallPopup/Popup'
import PopupButton from '../Popups/smallPopup/PopupButton'
import { renameIcon, trashIcon } from '../../helpers/importIcons'
import { useOnClickOutside } from '../../helpers/customHooks'
import { columnInterface, sessionInterface } from '../../helpers/interfaces'
import { deleteColumn, updateColumn } from '../../helpers/firestore'

interface ColumnI {
  id: string
  title: string
  index: number
  position: number
  blockIdEdit: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
  corner: 'left' | 'right' | 'none' | null

  session: sessionInterface
  indexOfTable: number
  idOfTable: string
}

const Column: FC<ColumnI> = memo((props) => {
  const [popupIsOpen, handlePopup] = useState<boolean>(false)
  const [rename, handleRename] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.title)
  const ref = useRef(null)

  const sessionBlocks = props.session.tables[props.indexOfTable]?.blocks
  const sessionBlocksInCurrentColumn =
    sessionBlocks && sessionBlocks.filter((block) => block.columnId === props.id)

  const columnVariants: Variants = {
    open: {
      width: '100%',
      minWidth: 'max(calc(25% - .5rem), 20rem)',
    },
    close: {
      width: '0%',
      minWidth: '0%',
    },
  }

  useOnClickOutside(ref, async () => {
    const newColumn: columnInterface = {
      id: props.id,
      title
    }
    await updateColumn(props.session, props.idOfTable, props.id, newColumn)
    handleRename(false)
  })

  return (
    <motion.div
      initial={'close'}
      animate={'open'}
      transition={{ duration: 0.3 }}
      variants={columnVariants}
      className={style.column}
      style={{ maxHeight: '100%', overflowY: 'auto', overflowX: 'hidden', order: props.position }}
    >
      <motion.div className={style.columnHeader} style={{ paddingBottom: '.75rem' }}>
        <div className={style.columnTitle}>
          {props.index + 1}.{' '}
          {rename ? (
            <label ref={ref} className={style.label}>
              <input
                autoFocus={true}
                className={style.input}
                value={title || props.title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
              />
            </label>
          ) : (
            props.title
          )}
        </div>
        <div className={style.columnRightPart}>
          <div className={style.columnBlockCounter}>
            {sessionBlocksInCurrentColumn && sessionBlocksInCurrentColumn.length}
          </div>
          <KebabButton handlePopup={handlePopup} />
          <Popup position={'left'} handlePopup={handlePopup} popupVisible={popupIsOpen}>
            <PopupButton onClickCallback={() => handleRename(true)} icon={renameIcon}>
              Переименовать колонку
            </PopupButton>
            <PopupButton
              onClickCallback={async () => {
                await deleteColumn(props.session, props.session.tables[props.indexOfTable].id, props.id)
              }}
              icon={trashIcon}
            >
              Удалить колонку
            </PopupButton>
          </Popup>
        </div>
      </motion.div>
      <motion.main
        className={style.columnMain}
        // layout={true}
      >
        {sessionBlocks &&
          sessionBlocks
            .filter((obj) => obj.columnId === props.id)
            .map((block, index) => {
              return (
                <Block
                  key={index}
                  blockIdEdit={props.blockIdEdit}
                  setBlockIdEdit={props.setBlockIdEdit}
                  corner={props.corner}
                  index={index}
                  block={block}
                  session={props.session}
                  idOfTable={props.session.tables[props.indexOfTable].id}
                  idOfColumn={props.id}
                />
              )
            })}
        <ButtonAddBlock
          idOfColumn={props.id}
          indexOfTable={props.indexOfTable}
          session={props.session}
        />
      </motion.main>
    </motion.div>
  )
})

Column.displayName = 'column'
export default Column
