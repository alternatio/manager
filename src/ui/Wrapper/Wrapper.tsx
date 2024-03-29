import { FC, memo, ReactNode } from 'react'
import style from './styles/Wrapper.module.scss'

interface WrapperInterface {
  children?: ReactNode
  maxWidth: '110rem' | '86rem' | '66rem'
}

export const Wrapper: FC<WrapperInterface> = memo((props) => {
  return (
    <div className={style.wrapper}>
      <div style={{ width: `min(100%, ${props.maxWidth})` }} className={style.enterWrapper}>
        {props.children}
      </div>
    </div>
  )
})

Wrapper.displayName = 'wrapper'