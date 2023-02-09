import { addItem } from '../../helpers/editItems'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import { sessionsDataI } from '../../../data/sessionsData'
import { crossIcon } from '../../helpers/importIcons'

interface ButtonAddTable {
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const ButtonAddTable: FC<ButtonAddTable> = memo((props) => {
  return (
    <>
      {props.data.length <= 20 && (
        <div
          onClick={() => {
            addItem(props.setData, props.data)
          }}
          className={style.addTable}
        >
          <Image className={style.icon} src={crossIcon} alt={'cross'} />
          <span>Добавить таблицу</span>
        </div>
      )}
    </>
  )
})

ButtonAddTable.displayName = 'button add table'
export default ButtonAddTable
