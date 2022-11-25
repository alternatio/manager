import { FC, memo, useState } from 'react'
import style from '/styles/components/Header.module.scss'
import avatarIcon from '/public/icons/avatar.svg'
import Image from 'next/image'
import { HamburgerButton } from '../HamburgerButton/HamburgerButton'
import { AnimatePresence, motion } from 'framer-motion'

export const Header: FC = memo(() => {
  const [hamburgerIsOpen, handleHamburger] = useState<boolean>(false)

  return (
    <div className={style.Header}>
      <AnimatePresence>
        {hamburgerIsOpen &&
          <motion.div

            className={style.hamburger}>
            <button className={style.button}>
              Войти в аккаунт
            </button>
            <button className={style.button}>
              Сменить тему
            </button>
          </motion.div>
        }
      </AnimatePresence>

      <div className={style.leftPart}>
        <div className={style.logo}>PM</div>
      </div>
      <div className={style.rightPart}>
        <div className={style.nameOfAccount}></div>
        <Image className={style.avatarImage} src={avatarIcon} alt={'avatar'} />
        <HamburgerButton hamburgerIsOpen={hamburgerIsOpen} handleHamburger={handleHamburger} />
      </div>
    </div>
  )
})
