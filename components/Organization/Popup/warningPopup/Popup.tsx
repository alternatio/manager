import { motion } from 'framer-motion'
import { FC, memo } from 'react'
import style from '/styles/pages/Organization.module.scss'

interface PopupI {
  acceptFunction: CallableFunction
  text?: string
}

const Popup: FC<PopupI> = (props) => {
  const text = props.text ? props.text : 'Вы уверены?'

  return (
    // <svg className={style.graphWrapper} viewBox={'0 -100 400 200'}>
    //   <motion.polyline
    //     className={style.graphItem}
    //     stroke={'#000'}
    //     strokeWidth={3}
    //     fill={'none'}
    //     points={prepareGraphData.join()}
    //   ></motion.polyline>
    // </svg>
    <div></div>
  )
}

Popup.displayName = 'warning popup'
export default memo(Popup)
