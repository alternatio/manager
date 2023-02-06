import { MotionProps, Transition } from 'framer-motion'
import { cubicBezier } from 'popmotion'

export const commonAnimation: MotionProps = {
  initial: 'off',
  animate: 'on',
  exit: 'off'
}

export const commonTransition = (duration: number = .33): Transition => {
  return {
    duration: duration,
    type: cubicBezier(0.35, 0.35, 0.2, 1)
  }
}

export const transitionSpringSlow = {
  type: 'spring',
  stiffness: 80,
  damping: 10,
  restDelta: 0.001,
}

export const transitionSpringMedium = {
  type: 'spring',
  stiffness: 190,
  damping: 15,
  restDelta: 0.001,
}
