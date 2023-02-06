import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { Dispatch, memo, SetStateAction } from 'react'

import style from './styles/Input.module.scss'
import { validationV } from '../animations/variants'
import { commonTransition } from '../animations/commonAnimations'

interface InputProps {
  value: string
  setValue: Dispatch<SetStateAction<string>> | Function
  placeholder: string
  autoFocus?: boolean
  disableValidation?: boolean
}

const Input: NextPage<InputProps> = (props) => {
  return (
    <motion.label
      {...!props.disableValidation && {
        variants: validationV,
        initial: 'off',
        animate: props.value ? 'off' : 'on',
        transition: commonTransition()
      }}
      className={style.label}>
      <input
        className={style.input}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        maxLength={50}
        type='text'
      />
    </motion.label>
  )
}

Input.displayName = 'Input'
export default memo(Input)
