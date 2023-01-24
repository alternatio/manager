import { Dispatch, FC, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { sessionDataBlockI, sessionDataColumnI } from '../../../data/sessionsData'
import { motion, Variants } from 'framer-motion'
import { KebabButton } from '../../Kebab/Kebab'
import style from '/styles/pages/Organization.module.scss'

import Block from '../Block/Block'
import ButtonAddBlock from '../Buttons/ButtonAddBlock'
import Popup from '../Popup/smallPopup/Popup'
import PopupButton from '../Popup/smallPopup/PopupButton'
import { renameIcon, trashIcon } from '../../../functions/importIcons'
import { deleteColumn, renameItem } from '../../../functions/EditItems'
import { useOnClickOutside } from '../../../functions/customHooks'

interface ColumnI extends sessionDataColumnI {
  id: string
  title: string
  index: number
  position: number
  columns: sessionDataColumnI[]
  setColumns: Dispatch<SetStateAction<sessionDataColumnI[]>>
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
  blockIdEdit: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
  corner: 'left' | 'right' | null
  forceUpdate?: Function
}

const Column: FC<ColumnI> = memo((props) => {
  const [popupIsOpen, handlePopup] = useState<boolean>(false)
  const [rename, handleRename] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const ref = useRef(null)

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

  // const keyEvent = (event: KeyboardEvent) => {
  //   if (event.key === 'Enter' && rename) {
  //     renameItem(props.setColumns, props.columns, props.id, title)
  //     handleRename(false)
  //   }
  // }
  //
  // useEffect(() => {
  //   document.addEventListener('keypress', (event) => keyEvent(event))
  // }, [rename, title])

  useOnClickOutside(ref, () => {
    renameItem(props.setColumns, props.columns, props.id, title)
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
            {props.blocks.filter((obj) => obj.status === props.id).length}
          </div>
          <KebabButton handlePopup={handlePopup} />
          <Popup position={'left'} handlePopup={handlePopup} popupVisible={popupIsOpen}>
            <PopupButton onClickCallback={() => handleRename(true)} icon={renameIcon}>
              Переименовать колонку
            </PopupButton>
            <PopupButton onClickCallback={() => deleteColumn(props.setColumns, props.columns, props.id, props.setBlocks, props.blocks)} icon={trashIcon}>
              Удалить колонку
            </PopupButton>
          </Popup>
        </div>
      </motion.div>
      <motion.main className={style.columnMain} layout={'size'}>
        {props.blocks
          .filter((obj) => obj.status === props.id)
          .map((block, index) => {
            return (
              <Block
                key={index}
                id={block.id}
                title={block.title}
                status={block.id}
                color={block.color}
                isRequired={block.isRequired}
                isUrgent={block.isUrgent}
                text={block.text}
                dateToComplete={block.dateToComplete}
                blocks={props.blocks}
                setBlocks={props.setBlocks}
                blockIdEdit={props.blockIdEdit}
                setBlockIdEdit={props.setBlockIdEdit}
                columns={props.columns}
                forceUpdate={props.forceUpdate}
                corner={props.corner}
                index={index}
              />
            )
          })}
        <ButtonAddBlock blocks={props.blocks} setBlocks={props.setBlocks} idOfColumn={props.id} />
      </motion.main>
    </motion.div>
  )
})

Column.displayName = 'column'
export default Column
