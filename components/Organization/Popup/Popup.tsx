import { FC, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopupI {
  popupVisible: boolean
  handlePopup: Function

}

const Popup: FC<PopupI> = (props) => {
  return (
    <AnimatePresence>
      <motion.div>

      </motion.div>
    </AnimatePresence>
  )
}

export default memo(Popup)
