import { AnimatePresence, motion } from 'framer-motion'
import { FC, memo, ReactNode, useEffect, useState } from 'react'
import style from './styles/Button.module.scss'
import { commonAnimation, commonTransition } from '../animations/commonAnimations'
import { buttonBackgroundVariants } from './styles/variants'

type layoutT = {
  backgroundLayoutID: string
  backgroundLayoutColor: string
}

interface ButtonProps {
  onClick?: CallableFunction
  children?: ReactNode
  disabled?: boolean
  textColor?: string
  backgroundColor?: string
  padding?: string
  width?: '100%' | 'fit-content'
  layout?: layoutT
}

const Button: FC<ButtonProps> = ({
  onClick = () => {},
  children,
  disabled,
  layout,
  width = 'fit-content',
  textColor = '#fff',
  backgroundColor = '#000',
  padding = '0.5rem 0.8rem',
}) => {
  const [isHover, handleHover] = useState<boolean>(false)

  return (
    <motion.button
      style={{
        backgroundColor: backgroundColor,
        padding: padding,
        width: width,
      }}
      disabled={disabled}
      className={style.button}
      onClick={() => onClick()}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <AnimatePresence>
        {isHover && layout && (
          <motion.div
            style={{ backgroundColor: layout.backgroundLayoutColor }}
            layout={true}
            layoutId={layout.backgroundLayoutID}
            variants={buttonBackgroundVariants}
            transition={commonTransition(.25)}
            {...commonAnimation}
            className={style.buttonBackground}
          />
        )}
      </AnimatePresence>
      <span style={{ color: textColor }} className={style.text}>
        {children}
      </span>
    </motion.button>
  )
}

Button.displayName = 'Button'
export default memo(Button)
