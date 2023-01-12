import style from '/styles/pages/Organization.module.scss'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import trash from '/public/icons/trash.svg'
import edit from '/public/icons/edit.svg'
import rename from '/public/icons/rename.svg'
import Image from 'next/image'
import { deleteItem, renameItem } from '../../../functions/EditItems'

// without memo!

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
}

const Block: FC<BlockI> = memo((props) => {
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
          <div className={style.blockTitle}>{props.title}</div>
          {(props.isRequired || props.isUrgent) && (
            <div className={style.statesOfBlock}>
              {props.isRequired && <div className={style.isRequiredBlock}>Важно</div>}
              {props.isUrgent && <div className={style.isUrgentBlock}>Срочно</div>}
            </div>
          )}
          <div className={style.blockBody}>{props.text}</div>
          <div className={style.blockTime}>до {props.dateToComplete}</div>
          <div className={style.controller}>
            <button
              onClick={() => {deleteItem(props.setBlocks, props.blocks, props.id)}}
              className={style.buttonWithIcon}>
              <Image src={trash} alt={'trash'}/>
            </button>
            <button className={style.buttonWithIcon}>
              <Image src={edit} alt={'edit'} />
            </button>
            <button
              onClick={() => {renameItem(props.setBlocks, props.blocks, props.id, '123')}}
              className={style.buttonWithIcon}>
              <Image src={rename} alt={'rename'} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
})

export default Block
