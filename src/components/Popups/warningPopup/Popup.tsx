import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react'
import style from '../styles/Popup.module.scss'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { popupV } from '../../../ui/animations/variants'

interface PopupI {
  text?: string
  children?: ReactNode
  callback: Function
  warningPopup: boolean
  handleWarningPopup: Dispatch<SetStateAction<boolean>>
}

const Popup: FC<PopupI> = (props) => {
  const text = props.text ? props.text : 'Вы уверены?'

  return (
    <AnimatePresence>
      {props.warningPopup && (
        <motion.div
          variants={popupV}
          {...commonAnimation}
          transition={commonTransition()}
          className={style.wrapper}
        >
          <div className={`${style.body} ${style.bodyMaxWidth}`}>
            <span className={style.title}>{text}</span>
            {props.children && (
              <div className={style.title}>
                {props.children}
              </div>
            )}
            <div className={style.buttons}>
              <button
                onClick={() => {
                  props.callback()
                  props.handleWarningPopup(false)
                }}
                className={style.button}
              >
                Да
              </button>
              <button onClick={() => props.handleWarningPopup(false)} className={style.button}>
                Нет
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Popup.displayName = 'warning popup'
export default memo(Popup)
