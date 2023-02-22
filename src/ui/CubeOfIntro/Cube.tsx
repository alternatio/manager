import { FC, memo, useState } from 'react'
import style from './styles/Cube.module.scss'
import { Gif } from '../Gif/Gif'

export const Cube: FC<{ color: Readonly<string>; index: Readonly<number> }> = memo(
  ({ color, index }) => {
    const [hover, handleHover] = useState<boolean>(false)

    return (
      <div
        // onMouseEnter={() => handleHover(true)}
        // onMouseLeave={() => setTimeout(() => handleHover(false), 100)}
        style={{ background: color, transform: `translateY(-${index * 6}rem)` }}
        className={style.cube}
      >
        <Gif hover={hover} full={true} />
      </div>
    )
  }
)

Cube.displayName = 'Cube'