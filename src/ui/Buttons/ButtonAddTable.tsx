import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { FC, memo } from 'react'
import { crossIcon } from '../../helpers/importIcons'
import { sessionInterface } from '../../helpers/interfaces'
import { addTable } from '../../helpers/firestore'

interface ButtonAddTable {
  session: sessionInterface
}

const ButtonAddTable: FC<ButtonAddTable> = memo(({ session }) => {
  return (
    <>
      {session.tables.length <= 20 && (
        <div
          onClick={async () => {
            await addTable(session)
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
