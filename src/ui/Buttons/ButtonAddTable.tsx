import { addItem } from '../../helpers/editItems'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import { sessionsDataILegacy } from '../../../data/sessionsData'
import { crossIcon } from '../../helpers/importIcons'

interface ButtonAddTable {
  data: sessionsDataILegacy[]
  setData: Dispatch<SetStateAction<sessionsDataILegacy[]>>
}

const ButtonAddTable: FC<ButtonAddTable> = memo((props) => {
  return (
    <>
      {props.data.length <= 20 && (
        <div
          onClick={() => {
            // @ts-ignore
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
