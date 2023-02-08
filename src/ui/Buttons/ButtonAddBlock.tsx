import { Dispatch, FC, memo, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { getRandomColor } from '../../functions/global'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { addBlock } from '../../functions/editItems'
import Image from 'next/image'
import { crossIcon } from '../../functions/importIcons'

interface ButtonAddBlockI {
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
  idOfColumn: string
}

const ButtonAddBlock: FC<ButtonAddBlockI> = memo((props) => {
  return (
    <>
      {props.blocks.length <= 300 && (
        <motion.div
          style={{ order: 100000 }}
          onClick={() => {
            addBlock(
              props.setBlocks,
              props.blocks,
              props.idOfColumn,
              getRandomColor(),
              'Новый блок',
              false,
              false,
              'Задание которое кто-то напишет, а кто-то выполнит.',
              undefined
            )
          }}
          className={style.addBlock}
        >
          <Image className={style.icon} src={crossIcon} alt={'cross'} />
          <span>Добавить Блок</span>
        </motion.div>
      )}
    </>
  )
})

ButtonAddBlock.displayName = 'button add block'
export default ButtonAddBlock