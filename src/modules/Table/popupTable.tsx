import { Dispatch, FC, memo, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import edit from '/public/icons/edit.svg'
import trash from '/public/icons/trash.svg'

interface PopupTableI {
  handleRenameTitle: Dispatch<SetStateAction<boolean>>
  renameTitle: boolean
  menuIsOpen: boolean
}

const PopupTable: FC<PopupTableI> = memo((props) => {

  return (
    <AnimatePresence>
      {props.menuIsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={style.popup}
        >
          <button
            onClick={() => props.handleRenameTitle(!props.renameTitle)}
            className={style.popupButton}
          >
            <Image className={style.icon} src={edit} alt={'rename'} />
            <span>Переименовать</span>
          </button>
          <button className={style.popupButton}>
            <Image className={style.icon} src={trash} alt={'trash'} />
            <span>Удалить таблицу</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

PopupTable.displayName = 'popup of table'
export default PopupTable