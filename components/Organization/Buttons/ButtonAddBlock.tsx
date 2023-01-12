import { Dispatch, FC, memo, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { getRandomColor, getRandomNumber, getRandomText } from '../../../functions/global'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { addBlock } from '../../../functions/EditItems'
import Image from 'next/image'
import cross from '/public/icons/cross.svg'

interface ButtonAddBlockI {
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
  idOfColumn: string
}

const ButtonAddBlock: FC<ButtonAddBlockI> = memo((props) => {
  return (
    <>
      {props.blocks.length <= 300 && (
        <motion.div layoutScroll={false}
          onClick={() => {
            addBlock(
              props.setBlocks,
              props.blocks,
              props.idOfColumn,
              getRandomColor(),
              'Block',
              false,
              false,
              getRandomText(getRandomNumber(1, 10)),
              undefined
            )
          }}
          className={style.addBlock}
        >
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить Блок</span>
        </motion.div>
      )}
    </>
  )
})

ButtonAddBlock.displayName = 'button add block'
export default ButtonAddBlock
