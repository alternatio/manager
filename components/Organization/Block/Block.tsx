import style from '/styles/pages/Organization.module.scss'
import { FC } from 'react'
import { sessionDataBlockI } from '../../../data/sessionsData'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import trash from '/public/icons/trash.svg'
import edit from '/public/icons/edit.svg'
import Image from 'next/image'

// without memo!

const Block: FC<sessionDataBlockI> = (props) => {
  const blockVariants: Variants = {
    open: {
      opacity: 1,
      borderTop: `${props.color} solid .5rem`,
      // maxHeight: '10rem'
    },
    close: {
      opacity: 0,
      borderTop: `${props.color} solid 0rem`,
      // maxHeight: '0rem'
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={'close'}
        animate={'open'}
        exit={'close'}
        style={
          props.isRequired || props.isUrgent
            ? props.isRequired && props.isUrgent
              ? { order: -11 }
              : { order: -10 }
            : undefined
        }
        variants={blockVariants}
        transition={{ duration: 0.4 }}
        className={style.block}
        // layout={'preserve-aspect'}
        layoutId={props.id}
      >
        <div className={style.blockInnerWrapper}>
          <div className={style.blockTitle}>{props.title}</div>
          {(props.isRequired || props.isUrgent) && (
            <div className={style.statesOfBlock}>
              {props.isRequired && <div className={style.isRequiredBlock}>Важно</div>}
              {props.isUrgent && <div className={style.isUrgentBlock}>Срочно</div>}
            </div>
          )}
          <div className={style.blockBody}>{props.text}</div>
          <div className={style.blockTime}>до {props.dateToComplete}</div>
          <div className={style.controller}>
            <button
              onClick={() => {}}
              className={style.controllerButton}>
              <Image src={trash} alt={'trash'}/>
            </button>
            <button className={style.controllerButton}>
              <Image src={edit} alt={'edit'} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Block
