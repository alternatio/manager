import { FC, memo, ReactNode } from 'react'
import style from './styles/Text.module.scss'

interface TextProps {
  children?: ReactNode
  color?: string
  fontSize?: string
  fontWeight?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  width?: '100%' | 'fit-content' | 'max-content' | string
  className?: string
}

const Text: FC<TextProps> = ({
  children,
  color = '#000',
  fontWeight = '500',
  fontSize = '1rem',
  align = 'left',
  width = 'fit-content',
  className,
}) => {
  return (
    <span
      style={{ color, fontWeight, fontSize, textAlign: align, width }}
      className={`${style.text} ${className}`}
    >
      {children}
    </span>
  )
}

Text.displayName = 'Text'
export default memo(Text)
