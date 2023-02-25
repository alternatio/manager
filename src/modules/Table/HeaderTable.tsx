import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'

import { KebabButton } from '../../ui/Kebab/Kebab'
import { motion } from 'framer-motion'
import Popup from '../../components/Popups/smallPopup/Popup'
import PopupButton from '../../components/Popups/smallPopup/PopupButton'
import { renameIcon, searchIcon, topArrowIcon, trashIcon } from '../../helpers/importIcons'
import { useOnClickOutside } from '../../helpers/customHooks'
import { sessionInterface, tableInterface } from '../../helpers/interfaces'
import { deleteTable, updateTable } from '../../helpers/firestore'
import IconButton from '../../ui/Buttons/IconButton'

interface HeaderTableI {
  id: string
  index: number
  popupIsOpen: boolean
  tableIsOpen: boolean
  handlePopup: Dispatch<SetStateAction<boolean>>
  handleTableOpen: Function

  session: sessionInterface
}

const HeaderTable: FC<HeaderTableI> = memo((props) => {
  const [rename, handleRename] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.session.tables[props.index].title)
  const ref = useRef(null)

  useOnClickOutside(ref, async () => {
    const newTable: tableInterface = {
      ...props.session.tables[props.index],
      title
    }
    await updateTable(props.session, props.id, newTable)
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
          <span className={style.headerTitle}>{props.session.tables[props.index]?.title}</span>
        )}
        <button className={style.buttonWithIcon}>
          <Image className={style.icon} src={searchIcon} alt={'search'} />
        </button>
        {/*<IconButton onClickCallback={() => deleteTable(props.session, props.id)}>*/}
        {/*  <Image src={trashIcon} alt={'trash'} />*/}
        {/*</IconButton>*/}
        <KebabButton handlePopup={props.handlePopup} />
        <Popup popupVisible={props.popupIsOpen} handlePopup={props.handlePopup} position={'right'}>
          <PopupButton icon={renameIcon} onClickCallback={() => handleRename(true)}>
            Переименовать таблицу
          </PopupButton>
          <PopupButton
            icon={trashIcon}
            onClickCallback={() => deleteTable(props.session, props.id)}
          >
            Удалить таблицу
          </PopupButton>
        </Popup>
      </div>
      <button
        onClick={() => {
          props.handleTableOpen(!props.tableIsOpen)
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
