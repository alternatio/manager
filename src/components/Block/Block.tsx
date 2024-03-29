import style from '/styles/pages/Organization.module.scss'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import IconButton from '../../ui/Buttons/IconButton'
import { arrowIcon, editIcon, trashIcon } from '../../helpers/importIcons'
import { randomColors } from '../../helpers/global'
import { blockInterface, sessionInterface } from '../../helpers/interfaces'
import { deleteBlock, swapColumnID, updateBlock } from '../../helpers/firestore'

interface BlockI {
  blockIdEdit: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
  isSelected?: boolean
  corner?: 'left' | 'right' | 'none' | null
  index: number
  block: blockInterface
  session: sessionInterface
  idOfTable: string
  idOfColumn?: string
}

const Block: FC<BlockI> = memo((props) => {
  const [title, setTitle] = useState<string>(props.block.title)
  const [text, setText] = useState<string>(props.block.task)
  const [color, setColor] = useState<string>(props.block.color)
  const [isRequired, handleIsRequired] = useState<boolean>(props.block.isRequired)
  const [isUrgent, handleIsUrgent] = useState<boolean>(props.block.isUrgent)
  const [dateToComplete, setDateToComplete] = useState<string>(props.block.dateToComplete)

  const blockVariants: Variants = {
    open: {
      opacity: 1,
      borderTop: `${props.isSelected ? color : props.block.color} solid ${
        props.isSelected ? '.75rem' : '.5rem'
      }`,
      // minHeight: '13rem',
      // maxHeight: '13rem'
    },
    close: {
      opacity: 0,
      borderTop: `${props.isSelected ? color : props.block.color} solid ${
        props.isSelected ? '.75rem' : '.5rem'
      }`,
      // minHeight: '0rem',
      // maxHeight: '0rem'
    },
  }

  // console.log(props.index, props.blocks.length - 1)

  return (
    <AnimatePresence>
      {(props.blockIdEdit !== props.block.id || props.isSelected) && (
        <motion.div
          initial={'close'}
          animate={'open'}
          exit={'close'}
          style={
            props.block.isRequired || props.block.isUrgent
              ? props.block.isRequired && props.block.isUrgent
                ? { order: -1100 }
                : { order: -1099 }
              : { order: props.index }
            // : { }
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
              <div className={style.blockTitle}>{props.block.title}</div>
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
            {!props.isSelected && (props.block.isRequired || props.block.isUrgent) && (
              <div className={style.statesOfBlock}>
                {props.block.isRequired && <div className={style.isRequiredBlock}>Важно</div>}
                {props.block.isUrgent && <div className={style.isUrgentBlock}>Срочно</div>}
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
                          defaultChecked={value === props.block.color}
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
                {props.block.task}
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
              <div className={style.blockTime}>до {props.block.dateToComplete}</div>
            )}
            <div className={style.controller}>
              {!props.isSelected && (
                <>
                  <IconButton
                    onClickCallback={async () => {
                      await deleteBlock(props.session, props.idOfTable, props.block.id)
                    }}
                  >
                    <Image className={style.icon} src={trashIcon} alt={'trash'} />
                  </IconButton>
                  <IconButton onClickCallback={() => props.setBlockIdEdit(props.block.id)}>
                    <Image className={style.icon} src={editIcon} alt={'edit'} />
                  </IconButton>

                  {(props.corner === 'right' || props.corner === null) && (
                    <IconButton
                      onClickCallback={async () => {
                        props.idOfColumn &&
                          (await swapColumnID(
                            props.session,
                            props.idOfTable,
                            props.idOfColumn,
                            props.block.id,
                            'left'
                          ))
                      }}
                    >
                      <Image className={style.icon} src={arrowIcon} alt={'arrow left'} />
                    </IconButton>
                  )}
                  {(props.corner === 'left' || props.corner === null) && (
                    <IconButton
                      onClickCallback={async () => {
                        props.idOfColumn &&
                          (await swapColumnID(
                            props.session,
                            props.idOfTable,
                            props.idOfColumn,
                            props.block.id,
                            'right'
                          ))
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
                    onClick={async () => {
                      const resultBlock: blockInterface = {
                        ...props.block,
                        title,
                        task: text,
                        color,
                        isUrgent,
                        isRequired,
                        dateToComplete,
                      }

                      await updateBlock(props.session, props.idOfTable, props.block.id, resultBlock)

                      props.setBlockIdEdit('')
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
