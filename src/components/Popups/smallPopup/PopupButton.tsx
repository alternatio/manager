import { FC, memo, ReactNode } from 'react'
import style from '../styles/Popup.module.scss'
import Image from 'next/image'

interface PopupButtonI {
  onClickCallback: CallableFunction
  icon: string
  children: ReactNode
}

const PopupButton: FC<PopupButtonI> = (props) => {
  return (
    <button
      onClick={() => props.onClickCallback()}
      className={style.popupButton}>
      <Image className={style.icon} src={props.icon} alt={'popup button icon'} />
      {props.children}
    </button>
  )
}

PopupButton.displayName = 'PopupButton'
export default memo(PopupButton)