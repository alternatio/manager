import style from '/styles/pages/Organization.module.scss'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { deleteItem, renameItem } from '../../../functions/EditItems'
import IconButton from '../global/IconButton'
import { editIcon, renameIcon, trashIcon } from '../../../functions/importIcons'

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
  const [rename, handleRename] = useState<boolean>(false)

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
            <IconButton onClickCallback={() => deleteItem(props.setBlocks, props.blocks, props.id)}>
              <Image className={style.icon} src={trashIcon} alt={'trash'} />
            </IconButton>
            <IconButton onClickCallback={() => {}}>
              <Image className={style.icon} src={editIcon} alt={'edit'} />
            </IconButton>
            <IconButton
              onClickCallback={() => renameItem(props.setBlocks, props.blocks, props.id, '123')}
            >
              <Image className={style.icon} src={renameIcon} alt={'rename'} />
            </IconButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
})

Block.displayName = 'Block'
export default Block
