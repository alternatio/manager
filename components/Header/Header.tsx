import { FC, memo, useState } from 'react'
import style from '/styles/components/Header.module.scss'
import avatarIcon from '/public/icons/avatar.svg'
import Image from 'next/image'
import { HamburgerButton } from './HamburgerButton/HamburgerButton'
import { Hamburger } from './Hamburger/Hamburger'

export const Header: FC = memo(() => {
  const [hamburgerIsOpen, handleHamburger] = useState<boolean>(false)

  return (
    <div className={style.Header}>
      <Hamburger hamburgerIsOpen={hamburgerIsOpen} />
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
