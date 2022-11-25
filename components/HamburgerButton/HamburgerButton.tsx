import { FC, memo } from 'react'
import style from '/styles/components/HamburgerButton.module.scss'
import { motion } from 'framer-motion'

interface HamburgerButtonInterface {
  hamburgerIsOpen: boolean
  handleHamburger: Function
}

const transition = {
  type: 'spring',
  stiffness: 80,
  damping: 10,
  restDelta: 0,
}

export const HamburgerButton: FC<HamburgerButtonInterface> = memo(
  ({ hamburgerIsOpen, handleHamburger }) => {
    return (
      <motion.button
        transition={transition}
        animate={hamburgerIsOpen ? { gap: '0rem' } : {}}
        onClick={() => handleHamburger(!hamburgerIsOpen)}
        className={style.hamburgerButton}
      >
        <motion.span
          transition={transition}
          animate={hamburgerIsOpen ? { rotate: '-45deg', y: '50%' } : {}}
          className={style.hamburgerButtonLine}
        />
        <motion.span
          transition={transition}
          animate={hamburgerIsOpen ? { rotate: '45deg', y: '-50%' } : {}}
          className={style.hamburgerButtonLine}
        />
      </motion.button>
    )
  }
)
