import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from './styles/Header.module.scss'
import Image from 'next/image'
import { HamburgerButton } from '../../ui/HamburgerButton/HamburgerButton'
import { Hamburger } from '../../ui/Hamburger/Hamburger'
import { User } from '@firebase/auth'
import { avatarIcon } from '../../helpers/importIcons'
import Popup from '../../components/Popups/warningPopup/Popup'
import { signOutWithGooglePopup } from '../../helpers/firestore'
import Link from 'next/link'

interface HeaderInterface {
  userData: User | null
  setUserData: Dispatch<SetStateAction<User | null>>
  organization?: string
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
}

export const Header: FC<HeaderInterface> = memo((props) => {
  const [hamburgerIsOpen, handleHamburger] = useState<boolean>(false)
  const [warningPopup, handleWarningPopup] = useState<boolean>(false)
  const [enterInSessionPopup, handleEnterInSessionPopup] = useState<boolean>(false)

  return (
    <>
      <Popup
        callback={() => signOutWithGooglePopup(props.setUserData)}
        handleWarningPopup={handleWarningPopup}
        warningPopup={warningPopup}
        text={'Вы уверены? Выйти?'}
      />

      <div className={style.Header}>
        <div className={style.leftPart}>
          <Link className={style.logo} href={'/'}>
            PM
          </Link>
          {props.organization && <span className={style.organization}>{props.organization}</span>}
        </div>
        <div className={style.rightPart}>
          <div className={style.accountText}>
            <span className={style.nameOfAccount}>{props.userData?.displayName}</span>
            <span className={style.mailOfAccount}>{props.userData?.email}</span>
          </div>
          <Image
            className={`${style.avatarImage} ${props.userData && style.avatarImageWithBorder}`}
            src={props.userData?.photoURL || avatarIcon}
            alt={'avatar'}
            referrerPolicy={'no-referrer'}
            width={60}
            height={60}
          />
          <Hamburger
            userData={props.userData}
            handleAddSessionPopup={props.handleAddSessionPopup}
            handleWarningPopup={handleWarningPopup}
            hamburgerIsOpen={hamburgerIsOpen}
            setUserData={props.setUserData}
            handleEnterInSessionPopup={handleEnterInSessionPopup}
            handleHamburger={handleHamburger}
          />
          <HamburgerButton hamburgerIsOpen={hamburgerIsOpen} handleHamburger={handleHamburger} />
        </div>
      </div>
    </>
  )
})

Header.displayName = 'Header'
