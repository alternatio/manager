import { Variants } from 'framer-motion'

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