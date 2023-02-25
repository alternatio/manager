import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/Popup.module.scss'
import { motion } from 'framer-motion'
import Input from '../../../ui/Input/Input'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { popupV } from '../../../ui/animations/variants'
import { createOrganization } from '../../../helpers/firestore'
import Button from '../../../ui/Button/Button'
import Text from '../../../ui/Text/Text'
import { User } from '@firebase/auth'
import { useRouter } from 'next/router'

interface AddSessionPopupProps {
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  userData: User | null
}

export const CreateSessionPopup: FC<AddSessionPopupProps> = (props) => {
  const [nameOfOrganization, setName] = useState<string>('')
  const [passwordOfOrganization, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const errors = [
    'Недостаточная длина имени (минимальная длина 4)',
    'Недостаточная длина пароля (минимальная длина 6)',
    'Что-то произошло. Попробуйте ещё раз',
  ]

  const closePopup = () => {
    props.handleAddSessionPopup(false)
  }

  const createWithValid = async () => {
    if (nameOfOrganization.length >= 4 && passwordOfOrganization.length >= 6) {
      closePopup()
      const orgObject = await createOrganization(props.userData, nameOfOrganization, passwordOfOrganization, router)
      localStorage.setItem('organization', JSON.stringify(orgObject))
    } else if (nameOfOrganization.length < 4) {
      setError(errors[0])
    } else if (passwordOfOrganization.length < 6) {
      setError(errors[1])
    }
  }

  const keyDown = async (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        await createWithValid()
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
    <motion.div
      variants={popupV}
      {...commonAnimation}
      transition={commonTransition()}
      className={style.wrapper}
    >
      <div className={style.body}>
        <Input
          value={nameOfOrganization}
          setValue={setName}
          placeholder={'Название организации'}
          autoFocus={true}
          maxLength={20}
          setError={setError}
        />
        <Input
          maxLength={20}
          value={passwordOfOrganization}
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
        <Button width={'100%'} onClick={async () => await createWithValid()}>
          Создать
        </Button>
      </div>
      <div onClick={() => closePopup()} className={style.backgroundClose} />
    </motion.div>
  )
}
