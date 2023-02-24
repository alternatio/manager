import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { crossIcon } from '../../helpers/importIcons'
import { addBlock } from '../../helpers/firestore'
import { sessionInterface } from '../../helpers/interfaces'

interface ButtonAddBlockI {
  session: sessionInterface
  indexOfTable: number
  idOfColumn: string
}

const ButtonAddBlock: FC<ButtonAddBlockI> = memo((props) => {
  const rawBlocksLength = props.session.tables[props.indexOfTable]?.columns
  const blocksLength = rawBlocksLength ? rawBlocksLength.length : 0

  return (
    <>
      {blocksLength <= 300 && (
        <motion.div
          style={{ order: 100000 }}
          onClick={async () => {
            await addBlock(props.session, props.indexOfTable, props.idOfColumn)
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
