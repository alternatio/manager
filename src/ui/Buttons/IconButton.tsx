import { FC, memo, ReactNode } from 'react'
import style from '/styles/pages/Organization.module.scss'

interface IconButtonI {
  onClickCallback: CallableFunction
  children: ReactNode
}

const IconButton: FC<IconButtonI> = (props) => {
  return (
    <button onClick={() => props.onClickCallback()} className={style.buttonWithIcon}>
      {props.children}
    </button>
  )
}

export default memo(IconButton)
