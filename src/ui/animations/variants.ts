import { Variants } from 'framer-motion'
import { transitionSpringMedium } from './commonAnimations'

export const validationV: Variants = {
  on: {
    border: '#f03 solid .2rem',
  },
  off: {
    border: 'transparent solid .2rem',
  },
}

export const hamburgerV: Variants = {
  on: {
    y: '0rem',
    opacity: 1,
    pointerEvents: 'all',
  },
  off: {
    y: '-5rem',
    opacity: 0,
    pointerEvents: 'none',
  },
}

export const popupV: Variants = {
  on: {
    opacity: 1,
    scaleX: 1,
  },
  off: {
    opacity: 0,
    scaleX: 1.1,
  },
}

export const smallPopupV: Variants = {
  on: {
    opacity: 1,
    transform: 'translateY(0rem) scale(1)',
  },
  off: {
    opacity: 0,
    transform: 'translateY(-.5rem) scale(.9)',
  }
}

export const loadingV: Variants = {
  on: custom => ({
    x: `-${custom * 2}0%`,
    y: `${custom}0%`,
    opacity: 1,
    transition: {...transitionSpringMedium}
  }),
  off: custom => ({
    x: '100%',
    y: `${custom}0%`,
    opacity: 0,
    transition: {delay: custom * .1, duration: 1},
  })
}

export const searchV: Variants = {
  on: {
    width: '10rem',
  },
  off: {
    width: '0rem',
  }
}

export const svgImageV: Variants = {
  on: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 }
    }
  },
  off: {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 }
    }
  }
}