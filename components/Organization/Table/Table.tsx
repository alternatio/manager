import { sessionDataColumnI, sessionsDataI } from '../../../data/sessionsData'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import rename from '/public/icons/rename.svg'
import trash from '/public/icons/trash.svg'
import search from '/public/icons/search.svg'
import { KebabButton } from '../../Kebab/Kebab'
import topArrow from '/public/icons/topArrow.svg'
import cross from '/public/icons/cross.svg'
import PopupTable from './popupTable'
import Column from '../Column/Column'

interface TableI {
  title: string
  index: number
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const Table: FC<TableI> = memo((props) => {
  const [menuIsOpen, handleMenu] = useState<boolean>(false)
  const [renameTitle, handleRenameTitle] = useState<boolean>(false)
  const [columns, setColumns] = useState<sessionDataColumnI[]>([])

  return (
    <div className={style.table}>
      <header className={style.header}>
        <div className={style.headerLeftPart}>
          {renameTitle ? (
            <label className={style.label}>
              <input
                className={style.input}
                defaultValue={props.data[props.index].title}
                onChange={(e) => {
                  const backupData = props.data
                  backupData[props.index].title = e.target.value
                  props.setData(backupData)
                }}
                type='text'
              />
            </label>
          ) : (
            <span className={style.headerTitle}>{props.data[props.index].title}</span>
          )}
          <button>
            <Image className={style.icon} src={search} alt={'search'} />
          </button>
          <KebabButton  handleMenu={handleMenu} menuIsOpen={menuIsOpen}/>
          <PopupTable handleRenameTitle={handleRenameTitle} renameTitle={renameTitle} menuIsOpen={menuIsOpen}/>
        </div>
        <button className={style.arrow}>
          <Image src={topArrow} alt={'arrow'} />
        </button>
      </header>
      <main className={style.tableMain}>
        <div className={style.column}>
          {columns.map(() => {
            return (
              <Column />
            )
          })}
        </div>
        <div className={style.addColumn}>
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить Колонку</span>
        </div>
      </main>
    </div>
  )
})

export default Table