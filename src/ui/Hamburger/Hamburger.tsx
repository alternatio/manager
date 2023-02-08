import { Dispatch, FC, memo, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from './styles/Hamburger.module.scss'
import Link from 'next/link'
import { commonAnimation, transitionSpringMedium } from '../animations/commonAnimations'
import { hamburgerV } from '../animations/variants'
import { User } from '@firebase/auth'
import { signInWithGooglePopup } from '../../functions/firestore'

interface HamburgerInterface {
  userData: User | null
  setUserData: Dispatch<SetStateAction<User | null>>
  hamburgerIsOpen: boolean
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  handleWarningPopup: Dispatch<SetStateAction<boolean>>
}

export const Hamburger: FC<HamburgerInterface> = memo((props) => {
  return (
    <AnimatePresence>
      {props.hamburgerIsOpen && (
        <motion.div
          variants={hamburgerV}
          {...commonAnimation}
          transition={transitionSpringMedium}
          className={style.hamburger}
        >
          <button className={style.button}>
            <Link className={style.link} href={'/about'}>
              О проекте
            </Link>
          </button>
          {!props.userData && (
            <button
              onClick={() => signInWithGooglePopup(props.setUserData)}
              className={style.button}
            >
              Войти в аккаунт
            </button>
          )}
          {props.userData && (
            <>
              <button className={style.button}>
                <Link className={style.link} href={'/myOrganizations'}>
                  Мои организации
                </Link>
              </button>
              <button onClick={() => props.handleAddSessionPopup(true)} className={style.button}>
                Создать доску
              </button>
              <button
                onClick={() => props.handleWarningPopup(true)}
                className={`${style.button} ${style.redButton}`}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Hamburger.displayName = 'Hamburger'
