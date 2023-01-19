import style from '/styles/pages/Organization.module.scss'
import { Dispatch, FC, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { deleteItem } from '../../../functions/EditItems'
import IconButton from '../global/IconButton'
import { arrowIcon, editIcon, trashIcon } from '../../../functions/importIcons'

interface BlockI extends sessionDataBlockI {
  id: string
  title: string
  status: string
  color: string
  isRequired: boolean
  isUrgent: boolean
  text: string
  dateToComplete: string
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
  blockIdEdit: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
  isSelected?: boolean
}

const Block: FC<BlockI> = memo((props) => {
  const [title, setTitle] = useState<string>(props.title)
  const [text, setText] = useState<string>(props.text)
  const [color, setColor] = useState<string>(props.color)
  const [isRequired, handleIsRequired] = useState<boolean>(props.isRequired)
  const [isUrgent, handleIsUrgent] = useState<boolean>(props.isUrgent)
  const [dateToComplete, setDateToComplete] = useState<string>(props.dateToComplete)

  const blockVariants: Variants = {
    open: {
      opacity: 1,
      borderTop: `${props.color} solid .5rem`,
      // maxHeight: '10rem'
    },
    close: {
      opacity: 0,
      borderTop: `${props.color} solid 0rem`,
      // maxHeight: '0rem'
    },
  }

  return (
    <AnimatePresence>
      {(props.blockIdEdit !== props.id || props.isSelected) && (
        <motion.div
          initial={'close'}
          animate={'open'}
          exit={'close'}
          style={
            props.isRequired || props.isUrgent
              ? props.isRequired && props.isUrgent
                ? { order: -11 }
                : { order: -10 }
              : undefined
          }
          variants={blockVariants}
          transition={{ duration: 0.4 }}
          className={style.block}
          layout={'preserve-aspect'}
          layoutId={props.id}
        >
          <div className={style.blockInnerWrapper}>
            {!props.isSelected ? (
              <div className={style.blockTitle}>{props.title}</div>
            ) : (
              <label className={style.label}>
                <input
                  className={`${style.blockTitle} ${style.input}`}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title ? title : 'Block'}
                  type={'text'}
                  maxLength={30}
                />
              </label>
            )}
            {!props.isSelected && (props.isRequired || props.isUrgent) && (
              <div className={style.statesOfBlock}>
                {props.isRequired && <div className={style.isRequiredBlock}>Важно</div>}
                {props.isUrgent && <div className={style.isUrgentBlock}>Срочно</div>}
              </div>
            )}
            {props.isSelected && (
              <div className={style.labelsCheckboxes}>
                <label className={style.labelCheckbox}>
                  <input
                    className={`${style.checkbox} ${style.isUrgentCheckbox}`}
                    onChange={(e) => handleIsRequired(e.target.checked)}
                    checked={isRequired}
                    type={'checkbox'}
                    data-content={'Важно'}
                    value={'isUrgentCheckbox'}
                  />
                </label>
                <label className={style.labelCheckbox}>
                  <input
                    className={`${style.checkbox} ${style.isRequiredCheckbox}`}
                    onChange={(e) => handleIsRequired(e.target.checked)}
                    checked={isRequired}
                    type={'checkbox'}
                    data-content={'Срочно'}
                    value={'isRequiredCheckbox'}
                  />
                </label>
              </div>
            )}
            {!props.isSelected ? (
              <motion.div
                style={
                  props.isSelected
                    ? { maxHeight: 'none', paddingBottom: '1.5rem' }
                    : { maxHeight: '10rem', paddingBottom: '0rem' }
                }
                className={style.blockBody}
              >
                {props.text}
              </motion.div>
            ) : (
              <label className={`${style.label} ${style.textareaLabel}`}>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={style.textarea}
                ></textarea>
              </label>
            )}
            <div className={style.blockTime}>до {props.dateToComplete}</div>
            <div className={style.controller}>
              {!props.isSelected && (
                <>
                  <IconButton
                    onClickCallback={() => deleteItem(props.setBlocks, props.blocks, props.id)}
                  >
                    <Image className={style.icon} src={trashIcon} alt={'trash'} />
                  </IconButton>
                  <IconButton onClickCallback={() => props.setBlockIdEdit(props.id)}>
                    <Image className={style.icon} src={editIcon} alt={'edit'} />
                  </IconButton>
                  <IconButton onClickCallback={() => {}}>
                    <Image className={style.icon} src={arrowIcon} alt={'arrow left'} />
                  </IconButton>
                  <IconButton onClickCallback={() => {}}>
                    <div
                      style={{ transform: 'rotateY(180deg)' }}
                      className={style.innerWrapperButton}
                    >
                      <Image className={style.icon} src={arrowIcon} alt={'arrow right'} />
                    </div>
                  </IconButton>
                </>
              )}
            </div>
            {props.isSelected && (
              <>
                <div className={style.blockBottomButtons}>
                  <button
                    onClick={() => {}}
                    className={`${style.button} ${style.blockBottomButton}`}
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {}}
                    className={`${style.button} ${style.blockBottomButton}`}
                  >
                    Сохранить
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Block.displayName = 'Block'
export default Block
