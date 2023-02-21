import { Dispatch, FC, memo, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from './styles/Hamburger.module.scss'
import Link from 'next/link'
import { commonAnimation, transitionSpringMedium } from '../animations/commonAnimations'
import { hamburgerV } from '../animations/variants'
import { User } from '@firebase/auth'
import { signInWithGooglePopup } from '../../helpers/firestore'
import { hamburgerButtonsDataInterface } from '../../helpers/interfaces'
import Button from '../Button/Button'

interface HamburgerInterface {
  userData: User | null
  setUserData: Dispatch<SetStateAction<User | null>>
  hamburgerIsOpen: boolean
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  handleWarningPopup: Dispatch<SetStateAction<boolean>>
  handleEnterInSessionPopup: Dispatch<SetStateAction<boolean>>
}

export const Hamburger: FC<HamburgerInterface> = memo((props) => {
  const hamburgerButtons: hamburgerButtonsDataInterface[] = [
    {
      children: (
        <Link className={style.link} href={'/about'}>
          О компании
        </Link>
      ),
      onClick: () => {},
      userDataRequired: null,
    },
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
      onClick: () => {},
      userDataRequired: true,
    },
    {
      children: 'Выйти из аккаунта',
      onClick: () => props.handleWarningPopup(true),
      userDataRequired: true,
      redButton: true,
    },
  ]

  return (
    <AnimatePresence>
      {props.hamburgerIsOpen && (
        <motion.div
          variants={hamburgerV}
          {...commonAnimation}
          transition={transitionSpringMedium}
          className={style.hamburger}
        >
          {hamburgerButtons.map((button, index) => {
            if (button.userDataRequired === null) {
              return (
                <Button
                  key={index}
                  onClick={button.onClick}
                  backgroundColor={'transparent'}
                  textColor={button.redButton ? '#f03' : '#000'}
                  // width={'100%'}
                  layout={{
                    backgroundLayoutColor: '#eee',
                    backgroundLayoutID: 'hamburgerButton',
                  }}
                >
                  {button.children}
                </Button>
              )
            } else if (button.userDataRequired === (props.userData !== null)) {
              return (
                <Button
                  key={index}
                  onClick={button.onClick}
                  backgroundColor={'transparent'}
                  textColor={button.redButton ? '#f03' : '#000'}
                  // width={'100%'}
                  layout={{
                    backgroundLayoutColor: '#eee',
                    backgroundLayoutID: 'hamburgerButton',
                  }}
                >
                  {button.children}
                </Button>
              )
            } else if (button.userDataRequired !== (props.userData === null)) {
              return (
                <Button
                  key={index}
                  onClick={button.onClick}
                  backgroundColor={'transparent'}
                  textColor={button.redButton ? '#f03' : '#000'}
                  // width={'100%'}
                  layout={{
                    backgroundLayoutColor: '#eee',
                    backgroundLayoutID: 'hamburgerButton',
                  }}
                >
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
