import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, memo, ReactNode, SetStateAction, useState } from 'react'
import style from './styles/Button.module.scss'
import { commonAnimation, commonTransition } from '../animations/commonAnimations'
import { buttonBackgroundVariants } from './styles/variants'

type layoutT = {
  backgroundLayoutID: string
  backgroundLayoutColor: string
  // hoverNumber: number
  // setHoverNumber: Dispatch<SetStateAction<number>>
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
      {layout && (
        <AnimatePresence>
          {isHover && (
            <motion.div
              style={{ backgroundColor: layout.backgroundLayoutColor }}
              layoutId={layout.backgroundLayoutID}
              layout={true}
              variants={buttonBackgroundVariants}
              transition={commonTransition(0.25)}
              {...commonAnimation}
              className={style.buttonBackground}
            />
          )}
        </AnimatePresence>
      )}

      <span style={{ color: textColor }} className={style.text}>
        {children}
      </span>
    </motion.button>
  )
}

Button.displayName = 'Button'
export default memo(Button)
