import { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

interface PopupI {
  popupIsVisible: boolean
  handlePopup: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  agreeAction: CallableFunction
  agreeColorIsRed: boolean
}

const Popup: FC<PopupI> = (props) => {
  return (
    <AnimatePresence>
      <motion.div className={style.popupWrapper}>
        <div className={style.bigPopup}>

          <button
            style={props.agreeColorIsRed ? {background: '#ff0033'} : {background: '#000'}}
            onClick={() => props.agreeAction()}
            className={`${style.bigPopupButton} ${style.button}`}>
            Ок
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

Popup.displayName = 'Popup'
export default memo(Popup)