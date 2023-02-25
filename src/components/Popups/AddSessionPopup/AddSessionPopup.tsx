import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/Popup.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { addOrganization, createOrganization, getUser } from '../../../helpers/firestore'
import { popupV } from '../../../ui/animations/variants'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import Input from '../../../ui/Input/Input'
import Text from '../../../ui/Text/Text'
import Button from '../../../ui/Button/Button'
import { User } from '@firebase/auth'

interface AddSessionPopupProps {
  popupIsOpen: boolean
  handlePopup: Dispatch<SetStateAction<boolean>>
}

const AddSessionPopup: FC<AddSessionPopupProps> = (props) => {
  const [idOfSession, setIdOfSession] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const errors = [
    'Недостаточная длина ID (минимальная длина 30)',
    'Недостаточная длина пароля (минимальная длина 6)',
    'Что-то произошло. Попробуйте ещё раз',
  ]

  const closePopup = () => {
    props.handlePopup(false)
  }

  const addWithValid = async () => {
    if (idOfSession.length >= 30 && password.length >= 6) {
      const owner = idOfSession.slice(0, idOfSession.indexOf('&'))
      const session = idOfSession.slice(idOfSession.indexOf('&') + 1)
      const user = getUser(setUser)

      if (user) {
        await addOrganization(user, idOfSession, owner, password, router)
      }



      // closePopup()
    } else if (idOfSession.length < 30) {
      setError(errors[0])
    } else if (password.length < 6) {
      setError(errors[1])
    }
  }

  const keyDown = async (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        await addWithValid()
        break
      case 'Escape':
        closePopup()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDown)
    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [])

  return (
    <AnimatePresence>
      {props.popupIsOpen && (
        <motion.div
          variants={popupV}
          {...commonAnimation}
          transition={commonTransition()}
          className={style.wrapper}
        >
          <div className={style.body}>
            <Input
              value={idOfSession}
              setValue={setIdOfSession}
              placeholder={'ID'}
              autoFocus={true}
              maxLength={40}
              setError={setError}
            />
            <Input
              maxLength={20}
              value={password}
              setValue={setPassword}
              placeholder={'Пароль'}
              setError={setError}
            />
            {error ? (
              <Text
                color={'#f03'}
                fontSize={'.9rem'}
                fontWeight={'400'}
                width={'17rem'}
                align={'center'}
              >
                {error}
              </Text>
            ) : (
              <Text
                fontSize={'.9rem'}
                fontWeight={'400'}
                color={'#888'}
                width={'17rem'}
                align={'center'}
              >
                Если у вас есть организация, выберите в пункте меню -Мои доски-
              </Text>
            )}
            <Button width={'100%'} onClick={async () => await addWithValid()}>
              Войти
            </Button>
          </div>
          <div onClick={() => closePopup()} className={style.backgroundClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

AddSessionPopup.displayName = 'AddSessionPopup'
export default memo(AddSessionPopup)
