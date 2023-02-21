import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/Popup.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { arrowIcon } from '../../../helpers/importIcons'
import Input from '../../../ui/Input/Input'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { popupV } from '../../../ui/animations/variants'
import { createOrganization } from '../../../helpers/firestore'
import Button from '../../../ui/Button/Button'
import Text from '../../../ui/Text/Text'
import { User } from '@firebase/auth'

interface AddSessionPopupProps {
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  userData: User | null
}

export const AddSessionPopup: FC<AddSessionPopupProps> = (props) => {
  const [nameOfOrganization, setName] = useState<string>('')
  const [passwordOfOrganization, setPassword] = useState<string>('')

  const closePopup = () => {
    props.handleAddSessionPopup(false)
  }

  const keyDown = async (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        await createOrganization(props.userData, nameOfOrganization, passwordOfOrganization)
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
        <button className={style.cancel} onClick={() => closePopup()}>
          <Image className={style.cancelImage} src={arrowIcon} alt={'arrowBack'} />
        </button>
        <Input
          value={nameOfOrganization}
          setValue={setName}
          placeholder={'Название организации'}
          autoFocus={true}
          maxLength={20}
        />
        <Input
          maxLength={16}
          value={passwordOfOrganization}
          setValue={setPassword}
          placeholder={'Пароль'}
        />
        <Text fontSize={'.9rem'} fontWeight={'400'} color={'#888'} width={'18rem'} align={'center'}>
          Если у вас есть организация, выберите в пункте меню -Мои доски-
        </Text>
        <Button
          width={'100%'}
          onClick={() =>
            createOrganization(props.userData, nameOfOrganization, passwordOfOrganization)
          }
        >
          Создать
        </Button>
      </div>
    </motion.div>
  )
}
