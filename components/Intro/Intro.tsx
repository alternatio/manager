import { FC, memo, useState } from 'react'
import style from '/styles/components/Intro.module.scss'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { getRandomNumber } from '../../functions/getRandomNumber'

const colorsOfCubes: string[] = ['#0011ff', '#ff0033', '#ffee00']

const getRandomGif = () => {
  return require(`/public/gifs/worker${getRandomNumber(1, 6)}.gif`)
}

const Cube: FC<{ color: string; index: number }> = memo(({ color, index }) => {
  const [hover, handleHover] = useState<boolean>(false)

  return (
    <div
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => setTimeout(() => handleHover(false), 100)}
      style={{ background: color, transform: `translateY(-${index * 6}rem)` }}
      className={style.cube}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            className={style.imageWrapper}
            transition={{ duration: 0.15 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image className={style.gif} src={getRandomGif()} alt={'gif'} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export const Intro: FC = memo(() => {
  return (
    <div className={style.intro}>
      <h2 className={style.helloWord}>Manage your work</h2>
      <p className={style.helloDescription}>Покажет, какую работу вы выполните</p>
      <div className={style.cubes}>
        {colorsOfCubes.map((value, index) => {
          return <Cube color={value} index={index} />
        })}
      </div>
    </div>
  )
})
