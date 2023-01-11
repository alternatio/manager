import { FC, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { transitionSpringMedium } from '../../../functions/transitions'
import style from '/styles/components/Hamburger.module.scss'

interface HamburgerInterface {
  hamburgerIsOpen: boolean
}

export const Hamburger: FC<HamburgerInterface> = memo(({hamburgerIsOpen}) => {
  return (
    <AnimatePresence>
      {hamburgerIsOpen && (
        <motion.div
          initial={{y: '-5rem', opacity: 0}}
          animate={{y: '0rem', opacity: 1}}
          exit={{y: '-5rem', opacity: 0}}
          transition={transitionSpringMedium}
          className={style.hamburger}>
          <button className={style.button}>Войти в аккаунт</button>
          <button className={style.button}>Сменить тему</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Hamburger.displayName = 'Hamburger'