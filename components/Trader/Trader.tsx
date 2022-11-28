import { motion } from 'framer-motion'
import { FC, memo, useState } from 'react'
import style from '/styles/components/Trader.module.scss'

import humanFriendlyGif from '/public/gifs/worker.gif'
import madeForPeopleGif from '/public/gifs/wow.gif'
import { Gif } from '../Gif/Gif'

export const Trader: FC = memo(() => {
  const [humanFriendlyHover, handleHumanFriendlyHover] = useState<boolean>(false)
  const [madeForPeopleHover, handleMadeForPeopleHover] = useState<boolean>(false)

  return (
    <div className={style.Trader}>
      <div className={style.pleasant}>
        Pleasant,{' '}
        <motion.span
          className={style.accent}
          onMouseEnter={() => handleHumanFriendlyHover(true)}
          onMouseLeave={() => handleHumanFriendlyHover(false)}
        >
          *human-friendly,
          <Gif hover={humanFriendlyHover} full={false} gif={humanFriendlyGif} />
        </motion.span>{' '}
        practical, not commercial,{' '}
        <motion.span
          className={style.accent}
          onMouseEnter={() => handleMadeForPeopleHover(true)}
          onMouseLeave={() => handleMadeForPeopleHover(false)}
        >
          *made <Gif hover={madeForPeopleHover} full={false} gif={madeForPeopleGif} />
          for people!
        </motion.span>
      </div>
      <div className={style.start}>
        <p className={style.text}>
          Начните пользоваться <br /> прямо сейчас
        </p>
        <button className={style.button}>Начать</button>
      </div>
    </div>
  )
})
