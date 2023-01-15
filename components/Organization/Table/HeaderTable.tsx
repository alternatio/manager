import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import { sessionsDataI } from '../../../data/sessionsData'

import { KebabButton } from '../../Kebab/Kebab'
import { motion } from 'framer-motion'
import Popup from '../Popup/smallPopup/Popup'
import PopupButton from '../Popup/smallPopup/PopupButton'
import { renameIcon, searchIcon, topArrowIcon, trashIcon } from '../../../functions/importIcons'

interface HeaderTableI {
  index: number
  popupIsOpen: boolean
  renameTitle: boolean
  tableIsOpen: boolean
  data: sessionsDataI[]
  handlePopup: Dispatch<SetStateAction<boolean>>
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
  handleTableOpen: Dispatch<SetStateAction<boolean>>
  handleRenameTitle: Dispatch<SetStateAction<boolean>>
}

const HeaderTable: FC<HeaderTableI> = memo((props) => {
  return (
    <motion.header
      // animate={props.tableIsOpen ? {borderBottom: '#000 solid .2rem'} : {borderBottom: '#000 solid 0rem'}}
      className={style.header}>
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
        <button className={style.buttonWithIcon}>
          <Image className={style.icon} src={searchIcon} alt={'search'} />
        </button>
        <KebabButton handlePopup={props.handlePopup} />
        <Popup popupVisible={props.popupIsOpen} handlePopup={props.handlePopup} position={'right'}>
          <PopupButton icon={renameIcon} onClickCallback={() => {}}>
            Переименовать таблицу
          </PopupButton>
          <PopupButton icon={trashIcon} onClickCallback={() => {}}>
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
