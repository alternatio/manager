import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockI, sessionDataColumnI } from '../../../data/sessionsData'
import Block from '../Block/Block'
import { motion, Variants } from 'framer-motion'
import ButtonAddBlock from '../Buttons/ButtonAddBlock'
import { KebabButton } from '../../Kebab/Kebab'

interface ColumnI extends sessionDataColumnI {
  id: string
  title: string
  index: number
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
}

const Column: FC<ColumnI> = memo((props) => {
  const [KebabIsOpen, handleColumnKebab] = useState<boolean>(false)

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

  return (
    <motion.div
      initial={'close'}
      animate={'open'}
      transition={{ duration: 0.3 }}
      variants={columnVariants}
      className={style.column}
      style={{maxHeight: '70vh', overflowY: 'auto'}}
    >
      <motion.div
        className={style.columnHeader}
        style={{paddingBottom: '.75rem'}}>
        <div className={style.columnTitle}>{`${props.index + 1}. ${props.title}`}</div>
        <div className={style.columnRightPart}>
          <div className={style.columnBlockCounter}>
            {props.blocks.filter((obj) => obj.status === props.id).length}
          </div>
          <KebabButton handleMenu={handleColumnKebab} menuIsOpen={KebabIsOpen} />
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
                status={block.status}
                color={block.color}
                isRequired={block.isRequired}
                isUrgent={block.isUrgent}
                text={block.text}
                dateToComplete={block.dateToComplete}
                blocks={props.blocks}
                setBlocks={props.setBlocks}
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
