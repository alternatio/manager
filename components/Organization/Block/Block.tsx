import style from '/styles/pages/Organization.module.scss'
import { FC } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { getRandomNumber, getRandomText } from '../../../functions/global'

// without memo!

const Block: FC<sessionDataBlockI> = (props) => {
  const blockVariants: Variants = {
    'open': {
      opacity: 1,
      // maxHeight: '10rem'
    },
    'close': {
      opacity: 0,
      // maxHeight: '0rem'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={'close'}
        animate={'open'}
        exit={'close'}
        variants={blockVariants}
        transition={{duration: .4}}
        style={{borderTop: `${props.color} solid .5rem`}}
        className={style.block}
        // layout={'preserve-aspect'}
        layoutId={props.id}
      >
        <div className={style.blockInnerWrapper}>
          <div className={style.blockTitle}>
            {props.title}
          </div>
          <div className={style.blockBody}>
            {props.text}
          </div>
          <div className={style.blockTime}>
            {props.id + ' ' + props.status + ' ' + props.color}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Block