import style from '/styles/pages/Organization.module.scss'
import { FC, memo } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'

interface BlockI extends sessionDataBlockI {
  id: string
  title: string
  status: number
  isRequired?: boolean
  isUrgent?: boolean
  text?: string
}

const Block: FC<BlockI> = memo((props) => {
  return (
    <div className={style.block}>
      <div className={style.blockTitle}>
        {props.title}
      </div>
      <div className={style.blockBody}>
        {props.text}
      </div>
      <div className={style.blockTime}>

      </div>
    </div>
  )
})

export default Block