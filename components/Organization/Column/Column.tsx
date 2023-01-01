import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockI, sessionDataColumnI } from '../../../data/sessionsData'
import Block from '../Block/Block'
import { addBlock } from '../../../functions/addBlocks'
import Image from 'next/image'
import cross from '/public/icons/cross.svg'

interface ColumnI extends sessionDataColumnI {
  id: string
  title: string
  index: number
  blocks: sessionDataBlockI[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockI[]>>
}

const Column: FC<ColumnI> = memo((props) => {
  return (
    <div className={style.column}>
      {props.blocks.map((block, index) => {
        return <Block key={index} id={block.id} title={block.title} status={block.status} />
      })}
      {props.index === 0 && (
        <div
          onClick={() => {
            addBlock(props.setBlocks, props.blocks)
          }}
          className={style.addBlock}
        >
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить Блок</span>
        </div>
      )}
    </div>
  )
})

export default Column
