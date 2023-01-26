import style from '/styles/pages/Organization.module.scss'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { sessionDataBlockI, sessionDataColumnI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { deleteBlock, swapStatus } from '../../../functions/EditItems'
import IconButton from '../global/IconButton'
import { arrowIcon, editIcon, trashIcon } from '../../../functions/importIcons'
import { randomColors } from '../../../functions/global'

interface BlockI extends sessionDataBlockI {
  id: string
  title: string
  status: string
  color: string
  isRequired: boolean
  isUrgent: boolean
  text: string
  dateToComplete: string
  columns: sessionDataColumnI[]
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
  blockIdEdit: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
  isSelected?: boolean
  forceUpdate?: Function
  corner?: 'left' | 'right' | null
  index: number
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
      borderTop: `${props.isSelected ? color : props.color} solid ${
        props.isSelected ? '.75rem' : '.5rem'
      }`,
      // minHeight: '13rem',
      // maxHeight: '13rem'
    },
    close: {
      opacity: 0,
      borderTop: `${props.isSelected ? color : props.color} solid ${
        props.isSelected ? '.75rem' : '.5rem'
      }`,
      // minHeight: '0rem',
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
                ? { order: -1100 }
                : { order: -1099 }
              : { order: props.index }
          }
          variants={blockVariants}
          transition={{ duration: 0.4 }}
          className={style.block}
          // layout={'preserve-aspect'}
          // layoutId={props.id}
        >
          {/*<div>{Math.random()}</div>*/}
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
                    className={`${style.checkbox} ${style.isRequiredCheckbox}`}
                    onChange={(e) => handleIsRequired(e.target.checked)}
                    checked={isRequired}
                    type={'checkbox'}
                    data-content={'Важно'}
                    name={'isRequiredCheckbox'}
                  />
                </label>
                <label className={style.labelCheckbox}>
                  <input
                    className={`${style.checkbox} ${style.isUrgentCheckbox}`}
                    onChange={(e) => handleIsUrgent(e.target.checked)}
                    checked={isUrgent}
                    type={'checkbox'}
                    data-content={'Срочно'}
                    name={'isUrgentCheckbox'}
                  />
                </label>
              </div>
            )}
            {props.isSelected && (
              <div className={style.blockColorsSelect}>
                <div className={style.labelsRadios}>
                  {randomColors.map((value, index) => {
                    return (
                      <label key={index} className={style.labelRadio}>
                        <input
                          className={style.inputRadio}
                          defaultChecked={value === props.color}
                          type='radio'
                          style={{ background: value }}
                          checked={color === value}
                          onChange={() => setColor(value)}
                        />
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
            {!props.isSelected ? (
              <motion.div
                style={
                  props.isSelected
                    ? { maxHeight: 'none', paddingBottom: '1.5rem' }
                    : { maxHeight: '10rem', paddingBottom: '0rem' }
                }
                // animate={}
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
                  maxLength={1000}
                ></textarea>
              </label>
            )}
            {props.isSelected ? (
              <div className={`${style.blockTime} ${style.blockTimeChanger}`}>
                выполнить до
                <label className={style.label}>
                  <input
                    className={style.blockTimeInput}
                    value={dateToComplete}
                    onChange={(e) => setDateToComplete(e.target.value)}
                    type='text'
                  />
                </label>
              </div>
            ) : (
              <div className={style.blockTime}>до {props.dateToComplete}</div>
            )}
            <div className={style.controller}>
              {!props.isSelected && (
                <>
                  <IconButton
                    onClickCallback={() => deleteBlock(props.setBlocks, props.blocks, props.id)}
                  >
                    <Image className={style.icon} src={trashIcon} alt={'trash'} />
                  </IconButton>
                  <IconButton onClickCallback={() => props.setBlockIdEdit(props.id)}>
                    <Image className={style.icon} src={editIcon} alt={'edit'} />
                  </IconButton>

                  {props.corner !== 'left' && (
                    <IconButton
                      onClickCallback={() => {
                        swapStatus(
                          props.setBlocks,
                          props.blocks,
                          'left',
                          props.id,
                          props.columns
                        )
                      }}
                    >
                      <Image className={style.icon} src={arrowIcon} alt={'arrow left'} />
                    </IconButton>
                  )}
                  {props.corner !== 'right' && (
                    <IconButton
                      onClickCallback={() => {
                        swapStatus(
                          props.setBlocks,
                          props.blocks,
                          'right',
                          props.id,
                          props.columns
                        )
                      }}
                    >
                      <div
                        style={{ transform: 'rotateY(180deg)' }}
                        className={style.innerWrapperButton}
                      >
                        <Image className={style.icon} src={arrowIcon} alt={'arrow right'} />
                      </div>
                    </IconButton>
                  )}
                </>
              )}
            </div>
            {props.isSelected && (
              <>
                <div className={style.blockBottomButtons}>
                  <button
                    onClick={() => props.setBlockIdEdit('')}
                    className={`${style.button} ${style.blockBottomButton}`}
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {
                      let resultData = props.blocks
                      let currentBlock = resultData.find((block) => block.id === props.id)
                      if (currentBlock) {
                        currentBlock = {
                          id: props.id,
                          status: props.status,
                          title,
                          isUrgent,
                          isRequired,
                          text,
                          dateToComplete,
                          color,
                        }
                        resultData = resultData.filter((block) => block.id !== props.id)
                        resultData.push(currentBlock)
                        props.setBlocks(resultData)
                        props.setBlockIdEdit('')
                      }
                    }}
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
