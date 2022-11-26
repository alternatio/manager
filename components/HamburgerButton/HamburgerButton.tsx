import { FC, memo } from 'react'
import style from '/styles/components/HamburgerButton.module.scss'
import { motion } from 'framer-motion'
import { transitionSpringSlow } from '../../functions/transitions'

interface HamburgerButtonInterface {
  hamburgerIsOpen: boolean
  handleHamburger: Function
}

export const HamburgerButton: FC<HamburgerButtonInterface> = memo(
  ({ hamburgerIsOpen, handleHamburger }) => {
    return (
      <motion.button
        transition={transitionSpringSlow}
        animate={hamburgerIsOpen ? { gap: '0rem' } : {}}
        onClick={() => handleHamburger(!hamburgerIsOpen)}
        className={style.hamburgerButton}
      >
        <motion.span
          transition={transitionSpringSlow}
          animate={hamburgerIsOpen ? { rotate: '-45deg', y: '50%' } : {}}
          className={style.hamburgerButtonLine}
        />
        <motion.span
          transition={transitionSpringSlow}
          animate={hamburgerIsOpen ? { rotate: '45deg', y: '-50%' } : {}}
          className={style.hamburgerButtonLine}
        />
      </motion.button>
    )
  }
)
