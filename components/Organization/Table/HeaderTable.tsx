import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { sessionsDataI } from '../../../data/sessionsData'

import { KebabButton } from '../../Kebab/Kebab'
import { motion } from 'framer-motion'
import Popup from '../Popup/smallPopup/Popup'
import PopupButton from '../Popup/smallPopup/PopupButton'
import { renameIcon, searchIcon, topArrowIcon, trashIcon } from '../../../functions/importIcons'
import { useOnClickOutside } from '../../../functions/customHooks'
import { deleteTable, renameItem } from '../../../functions/EditItems'

interface HeaderTableI {
  id: string
  index: number
  popupIsOpen: boolean
  tableIsOpen: boolean
  data: sessionsDataI[]
  handlePopup: Dispatch<SetStateAction<boolean>>
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
  handleTableOpen: Dispatch<SetStateAction<boolean>>
}

const HeaderTable: FC<HeaderTableI> = memo((props) => {
  const [rename, handleRename] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const ref = useRef(null)

  useOnClickOutside(ref, () => {
    renameItem(props.setData, props.data, props.data[props.index].id, title)
    handleRename(false)
  })

  return (
    <motion.header
      // animate={props.tableIsOpen ? {borderBottom: '#000 solid .2rem'} : {borderBottom: '#000 solid 0rem'}}
      className={style.header}
    >
      <div className={style.headerLeftPart}>
        {rename ? (
          <label className={style.label}>
            <input
              className={style.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              ref={ref}
              autoFocus={true}
            />
          </label>
        ) : (
          <span className={style.headerTitle}>{props.data[props.index].title}</span>
        )}
        <button className={style.buttonWithIcon}>
          <Image className={style.icon} src={searchIcon} alt={'search'} />
        </button>
        <KebabButton handlePopup={props.handlePopup} />
        <Popup popupVisible={props.popupIsOpen} handlePopup={props.handlePopup} position={'right'}>
          <PopupButton icon={renameIcon} onClickCallback={() => handleRename(true)}>
            Переименовать таблицу
          </PopupButton>
          <PopupButton icon={trashIcon} onClickCallback={() => deleteTable(props.setData, props.data, props.id)}>
            Удалить таблицу
          </PopupButton>
        </Popup>
      </div>
      <button
        onClick={() => {
          props.handleTableOpen((prevState) => !prevState)
        }}
        className={`${style.arrow} ${style.buttonWithIcon}`}
      >
        <motion.div
          className={style.innerWrapperButton}
          animate={props.tableIsOpen ? { rotate: '0deg' } : { rotate: '180deg' }}
        >
          <Image className={style.icon} src={topArrowIcon} alt={'arrow'} />
        </motion.div>
      </button>
    </motion.header>
  )
})

HeaderTable.displayName = 'Header of table'
export default HeaderTable
