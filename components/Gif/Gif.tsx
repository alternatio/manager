import { FC, memo } from 'react'
import { getRandomNumber } from '../../functions/getRandomNumber'
import { AnimatePresence, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import style from '/styles/components/Gif.module.scss'

interface GifInterface {
  hover: Readonly<boolean>
  full: Readonly<boolean>
  gif?: Readonly<StaticImageData>
}

export const Gif: FC<GifInterface> = memo(({ hover, full, gif }) => {
  const getRandomGif = () => {
    return require(`/public/gifs/worker${getRandomNumber(1, 6)}.gif`)
  }

  return (
    <AnimatePresence>
      {hover && (
        <motion.span
          className={full ? style.fullWrapper : style.wrapper}
          transition={{ duration: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            className={full ? style.fullGif : style.gif}
            src={gif ? gif : getRandomGif()}
            alt={'gif'}
          />
        </motion.span>
      )}
    </AnimatePresence>
  )
})
