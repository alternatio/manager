import { Dispatch, FC, memo, ReactNode, SetStateAction, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from '../styles/Popup.module.scss'
import { useOnClickOutside } from '../../../functions/customHooks'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { smallPopupV } from '../../../ui/animations/variants'

interface PopupI {
  popupVisible: boolean
  handlePopup: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  position?: 'left' | 'right'
}

const Popup: FC<PopupI> = (props) => {
  const popupRef = useRef(null)

  useOnClickOutside(popupRef, () => props.handlePopup(false), false)

  return (
    <AnimatePresence>
      {props.popupVisible && (
        <motion.div
          ref={popupRef}
          variants={smallPopupV}
          {...commonAnimation}
          transition={commonTransition()}
          style={props.position === 'left' ? { right: '2rem' } : { left: 'calc(100% + .5rem)' }}
          className={style.popup}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Popup.displayName = 'universal popup'
export default memo(Popup)
