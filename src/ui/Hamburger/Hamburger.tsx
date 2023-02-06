import { FC, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from './styles/Hamburger.module.scss'
import Link from 'next/link'
import { commonAnimation, transitionSpringMedium } from '../animations/commonAnimations'
import { hamburgerV } from '../animations/variants'

interface HamburgerInterface {
  hamburgerIsOpen: boolean
}

export const Hamburger: FC<HamburgerInterface> = memo(({ hamburgerIsOpen }) => {
  return (
    <AnimatePresence>
      {hamburgerIsOpen && (
        <motion.div
          variants={hamburgerV}
          {...commonAnimation}
          transition={transitionSpringMedium}
          className={style.hamburger}
        >
          <button className={style.button}>Мои организации</button>
          <button className={style.button}>Создать доску</button>
          <button className={style.button}>Войти в доску</button>

          <button className={style.button}>Войти в аккаунт</button>
          <button className={style.button}>
            <Link className={style.link} href={'/about'}>
              О проекте
            </Link>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Hamburger.displayName = 'Hamburger'
