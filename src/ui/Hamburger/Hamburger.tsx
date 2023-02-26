import { Dispatch, FC, memo, ReactNode, SetStateAction, useRef } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import style from './styles/Hamburger.module.scss'
import Link from 'next/link'
import { commonAnimation, transitionSpringMedium } from '../animations/commonAnimations'
import { hamburgerV } from '../animations/variants'
import { User } from '@firebase/auth'
import { signInWithGooglePopup } from '../../helpers/firestore'
import { hamburgerButtonsDataInterface } from '../../helpers/interfaces'
import Button from '../Button/Button'
import { useOnClickOutside } from '../../helpers/customHooks'

interface HamburgerInterface {
  userData: User | null
  setUserData: Dispatch<SetStateAction<User | null>>
  hamburgerIsOpen: boolean
  handleHamburger: Dispatch<SetStateAction<boolean>>
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  handleWarningPopup: Dispatch<SetStateAction<boolean>>
  handleEnterInSessionPopup: Dispatch<SetStateAction<boolean>>
}

interface buttonI {
  onClick: CallableFunction
  children: ReactNode
  isRedButton?: boolean
}

export const Hamburger: FC<HamburgerInterface> = memo((props) => {
  const popupRef = useRef(null)
  // useOnClickOutside(popupRef, () => {
  //   props.handleHamburger(false)
  // }, true)

  const hamburgerButtons: hamburgerButtonsDataInterface[] = [
    // {
    //   children: (
    //     <Link className={style.link} href={'/about'}>
    //       О компании
    //     </Link>
    //   ),
    //   onClick: () => {},
    //   userDataRequired: null,
    // },
    {
      children: 'Войти в аккаунт',
      onClick: () => signInWithGooglePopup(props.setUserData),
      userDataRequired: false,
    },
    {
      children: (
        <Link className={style.link} href={'/myOrganizations'}>
          Мои доски
        </Link>
      ),
      onClick: () => {},
      userDataRequired: true,
    },
    {
      children: 'Создать доску',
      onClick: () => props.handleAddSessionPopup(true),
      userDataRequired: true,
    },
    {
      children: 'Присоединиться к доске',
      onClick: () => props.handleEnterInSessionPopup(true),
      userDataRequired: true,
    },
    {
      children: 'Выйти из аккаунта',
      onClick: () => props.handleWarningPopup(true),
      userDataRequired: true,
      redButton: true,
    },
  ]

  const Button: FC<buttonI> = (props) => {
    return (
      <button
        onClick={() => props.onClick()}
        style={{ color: props.isRedButton ? '#f03' : '#000' }}
        className={style.button}
      >
        {props.children}
      </button>
    )
  }

  return (
    <AnimatePresence>
      {props.hamburgerIsOpen && (
        <motion.div
          variants={hamburgerV}
          {...commonAnimation}
          transition={transitionSpringMedium}
          className={style.hamburger}
          ref={popupRef}
        >
          {hamburgerButtons.map((button, index) => {
            if (button.userDataRequired === null) {
              return (
                <Button key={index} onClick={button.onClick} isRedButton={button.redButton}>
                  {button.children}
                </Button>
              )
            } else if (button.userDataRequired === (props.userData !== null)) {
              return (
                <Button key={index} onClick={button.onClick} isRedButton={button.redButton}>
                  {button.children}
                </Button>
              )
            } else if (button.userDataRequired !== (props.userData === null)) {
              return (
                <Button key={index} onClick={button.onClick} isRedButton={button.redButton}>
                  {button.children}
                </Button>
              )
            }
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Hamburger.displayName = 'Hamburger'
