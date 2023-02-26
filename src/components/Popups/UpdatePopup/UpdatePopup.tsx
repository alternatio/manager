import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import style from '../styles/Popup.module.scss'
import Input from '../../../ui/Input/Input'

interface UpdatePopupProps {
  isVisible: boolean
  handleVisible: Dispatch<SetStateAction<boolean>>
  functionOnUpdate: Function
  arrayOfValues: string[]
  arrayOfFunctions: Function[]
  arrayOfPlaceholders: string[]
}

const UpdatePopup: FC<UpdatePopupProps> = (props) => {
  return (
    <AnimatePresence>
      {props.isVisible && (
        <motion.div className={style.wrapper}>
          <div className={style.body}>
            {props.arrayOfFunctions.map((func, index) => {
              return (
                <Input
                  key={index}
                  value={props.arrayOfValues[index]}
                  setValue={func}
                  placeholder={props.arrayOfPlaceholders[index]}
                  maxLength={24}
                />
              )
            })}
            <div className={style.buttons}>
              <button onClick={() => props.handleVisible(false)} className={style.button}>
                Отмена
              </button>
              <button
                onClick={() => {
                  props.handleVisible(false)
                  props.functionOnUpdate()
                }}
                className={style.button}
              >
                Обновить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

UpdatePopup.displayName = 'UpdatePopup'
export default memo(UpdatePopup)
