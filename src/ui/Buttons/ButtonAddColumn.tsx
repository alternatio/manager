import { FC, memo } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { crossIcon } from '../../helpers/importIcons'
import { sessionInterface } from '../../helpers/interfaces'
import { addColumn } from '../../helpers/firestore'

interface ButtonAddColumnI {
  session: sessionInterface
  indexOfTable: number
}

const ButtonAddColumn: FC<ButtonAddColumnI> = memo((props) => {
  const rawColumnsLength = props.session.tables[props.indexOfTable]?.columns
  const columnsLength = rawColumnsLength ? rawColumnsLength.length : 0

  return (
    <>
      {columnsLength <= 19 && (
        <div
          onClick={async () => {
            await addColumn(props.session, props.indexOfTable)
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
