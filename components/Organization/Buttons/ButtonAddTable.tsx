import { addItemToData } from '../../../functions/addItems'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import cross from '/public/icons/cross.svg'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import { sessionsDataI } from '../../../data/sessionsData'

interface ButtonAddTable {
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const ButtonAddTable: FC<ButtonAddTable> = memo((props) => {
  return (
    <>
      {props.data.length <= 20 &&
        <div
          onClick={() => {
            addItemToData(props.setData, props.data)
          }}
          className={style.addTable}
        >
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить таблицу</span>
        </div>}
    </>
  )
})

export default ButtonAddTable