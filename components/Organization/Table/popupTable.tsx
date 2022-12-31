import { Dispatch, FC, memo, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from '/styles/pages/Organization.module.scss'
import Image from 'next/image'
import rename from '/public/icons/rename.svg'
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
          className={style.menu}
        >
          <button
            onClick={() => props.handleRenameTitle(!props.renameTitle)}
            className={style.menuButton}
          >
            <Image className={style.icon} src={rename} alt={'rename'} />
            <span>Переименовать</span>
          </button>
          <button className={style.menuButton}>
            <Image className={style.icon} src={trash} alt={'trash'} />
            <span>Удалить таблицу</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default PopupTable