import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataColumnI } from '../../../data/sessionsData'
import { addItemToData } from '../../../functions/addItems'
import Image from 'next/image'
import cross from '/public/icons/cross.svg'

interface ButtonAddColumnI {
  columns: sessionDataColumnI[]
  setColumns: Dispatch<SetStateAction<sessionDataColumnI[]>>
}

const ButtonAddColumn: FC<ButtonAddColumnI> = memo((props) => {
  return (
    <>
      {props.columns.length <= 19 && (
        <div
          onClick={() => {
            addItemToData(props.setColumns, props.columns)
          }}
          className={style.addColumn}
        >
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить Колонку</span>
        </div>
      )}
    </>
  )
})

export default ButtonAddColumn
