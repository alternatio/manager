import { Dispatch, FC, memo, ReactNode, SetStateAction } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import style from '/styles/pages/Organization.module.scss'

interface PopupI {
  popupVisible: boolean
  handlePopup: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  position?: 'left' | 'right'
}

const Popup: FC<PopupI> = (props) => {
  const popupVariants: Variants = {
    visible: {
      opacity: 1,
      transform: 'translateY(0rem) scale(1)',
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(-.5rem) scale(.9)',
    },
  }

  return (
    <AnimatePresence>
      {props.popupVisible && (
        <motion.div
          variants={popupVariants}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          transition={{ duration: 0.25 }}
          style={props.position === 'left' ? { right: '2rem' } : { left: 'calc(100% + .5rem)' }}
          onClick={() => props.handlePopup((prevState) => !prevState)}
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
