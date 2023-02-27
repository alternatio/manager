import { FC, memo, useEffect, useState } from 'react'
import { NextPage } from 'next'
import style from '/styles/pages/Loading.module.scss'
import { Wrapper } from '../src/ui/Wrapper/Wrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { commonAnimation, transitionSpringSlow } from '../src/ui/animations/commonAnimations'
import { loadingV } from '../src/ui/animations/variants'

interface loadingDataI {
  backgroundColor: string
}

const loadingData: loadingDataI[] = [
  {
    backgroundColor: '#fe0',
  },
  {
    backgroundColor: '#0fc',
  },
  {
    backgroundColor: '#f03',
  },
  {
    backgroundColor: '#01f',
  },
]

interface LoadingItemI {
  index: number,
  value: loadingDataI,
}

const LoadingItem: FC<LoadingItemI> = (props) => {
  const [isVisible, handleVisible] = useState<boolean>(true)

  return (
    <>
      <AnimatePresence onExitComplete={() => {
        setTimeout(() => {
          handleVisible(true)
        }, 500)
      }}>
        {isVisible && (
          <motion.div
            custom={props.index}
            style={{backgroundColor: props.value.backgroundColor}}
            variants={loadingV}
            {...commonAnimation}
            transition={transitionSpringSlow}
            className={style.loadingItem}
            onAnimationComplete={() => handleVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const Loading: NextPage = () => {
  return (
    <Wrapper maxWidth={'66rem'}>
      <div className={style.loading}>
        {loadingData.map((value, index) => {
          return (
            <LoadingItem value={value} index={index}/>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default memo(Loading)
