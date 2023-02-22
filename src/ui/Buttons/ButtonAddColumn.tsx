import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataColumnILegacy } from '../../../data/sessionsData'
import { addColumn, addItem } from '../../helpers/editItems'
import Image from 'next/image'
import { crossIcon } from '../../helpers/importIcons'

interface ButtonAddColumnI {
  columns: sessionDataColumnILegacy[]
  setColumns: Dispatch<SetStateAction<sessionDataColumnILegacy[]>>
}

const ButtonAddColumn: FC<ButtonAddColumnI> = memo((props) => {
  return (
    <>
      {props.columns.length <= 19 && (
        <div
          onClick={() => {
            addColumn(props.setColumns, props.columns)
          }}
          className={style.addColumn}
          style={{ order: 50 }}
        >
          <Image className={style.icon} src={crossIcon} alt={'cross'} />
          <span>Добавить Колонку</span>
        </div>
      )}
    </>
  )
})

ButtonAddColumn.displayName = 'button add column'
export default ButtonAddColumn
