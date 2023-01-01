import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import PopupTable from './popupTable'
import { sessionsDataI } from '../../../data/sessionsData'

import search from '/public/icons/search.svg'
import { KebabButton } from '../../Kebab/Kebab'
import topArrow from '/public/icons/topArrow.svg'

interface HeaderTableI {
  index: number
  menuIsOpen: boolean
  renameTitle: boolean
  data: sessionsDataI[]
  handleMenu: Dispatch<SetStateAction<boolean>>
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
  handleTableOpen: Dispatch<SetStateAction<boolean>>
  handleRenameTitle:  Dispatch<SetStateAction<boolean>>
}

const HeaderTable: FC<HeaderTableI> = memo((props) => {
  return (
    <header className={style.header}>
      <div className={style.headerLeftPart}>
        {props.renameTitle ? (
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
        <KebabButton handleMenu={props.handleMenu} menuIsOpen={props.menuIsOpen} />
        <PopupTable
          handleRenameTitle={props.handleRenameTitle}
          renameTitle={props.renameTitle}
          menuIsOpen={props.menuIsOpen}
        />
      </div>
      <button onClick={() => props.handleTableOpen((prevState) => !prevState)} className={style.arrow}>
        <Image src={topArrow} alt={'arrow'} />
      </button>
    </header>
  )
})

export default HeaderTable