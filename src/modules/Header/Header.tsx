import { FC, memo, useState } from 'react'
import style from './styles/Header.module.scss'
import avatarIcon from '/public/icons/avatar.svg'
import Image from 'next/image'
import { HamburgerButton } from '../../ui/HamburgerButton/HamburgerButton'
import { Hamburger } from '../../ui/Hamburger/Hamburger'

interface HeaderInterface {
  organization?: string
}

export const Header: FC<HeaderInterface> = memo(({ organization }) => {
  const [hamburgerIsOpen, handleHamburger] = useState<boolean>(false)

  return (
    <div className={style.Header}>
      <Hamburger hamburgerIsOpen={hamburgerIsOpen} />
      <div className={style.leftPart}>
        <span className={style.logo}>PM</span>
        {organization && <span className={style.organization}>{organization}</span>}
      </div>
      <div className={style.rightPart}>
        <div className={style.nameOfAccount}></div>
        <Image className={style.avatarImage} src={avatarIcon} alt={'avatar'} />
        <HamburgerButton hamburgerIsOpen={hamburgerIsOpen} handleHamburger={handleHamburger} />
      </div>
    </div>
  )
})

Header.displayName = 'Header'