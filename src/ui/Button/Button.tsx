import { AnimatePresence, motion } from 'framer-motion'
import { FC, memo, ReactNode, useState } from 'react'
import style from './styles/Button.module.scss'
import { commonAnimation, commonTransition } from '../animations/commonAnimations'
import { buttonBackgroundVariants } from './styles/variants'

interface ButtonProps {
  onClick?: CallableFunction
  children?: ReactNode
  disabled?: boolean
  textColor?: string
  backgroundColor?: string
  backgroundLayoutID?: string
  backgroundIsLayout?: string
}

const Button: FC<ButtonProps> = (props) => {
  const [isHover, handleHover] = useState<boolean>(false)

  return (
    <motion.button
      style={{ backgroundColor: props.backgroundColor }}
      disabled={props.disabled}
      className={style.button}
      onClick={() => props.onClick && props.onClick()}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <AnimatePresence>
        {isHover && props.backgroundIsLayout && (
          <motion.div
            layoutId={props.backgroundLayoutID}
            variants={buttonBackgroundVariants}
            transition={commonTransition(0.25)}
            {...commonAnimation}
            className={style.buttonBackground}
          />
        )}
      </AnimatePresence>
      <span style={{ color: props.textColor }} className={style.text}>
        {props.children}
      </span>
    </motion.button>
  )
}

Button.displayName = 'Button'
export default memo(Button)
