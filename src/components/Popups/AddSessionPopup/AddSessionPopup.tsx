import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/Popup.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { sessionsData } from '../../../../data/sessionsData'
import { getRandomId } from '../../../functions/global'
import { arrowIcon } from '../../../functions/importIcons'

import { db } from '../../../../data/firebase/firebase'
import { addDoc, collection } from '@firebase/firestore'
import Input from '../../../ui/Input/Input'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { popupV } from '../../../ui/animations/variants'

interface AddSessionPopupPropsRouter {
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
}

export const AddSessionPopup: FC<AddSessionPopupPropsRouter> = (props) => {
  const [nameOfOrganization, setName] = useState<string>('')
  const [passwordOfOrganization, setPassword] = useState<string>('')
  const router = useRouter()

  const closePopup = () => {
    props.handleAddSessionPopup(false)
  }

  const addOrganization = () => {
    if (!nameOfOrganization) {
      sessionsData.push({ id: getRandomId(), title: nameOfOrganization })
      router.push(`/organization/${nameOfOrganization}`)

      console.log(db)

      try {
        const docRef = addDoc(collection(db, 'users'), {
          firstName: 'Nikita',
        })
        console.log('doc: ', docRef)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const keyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        addOrganization()
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
        />
        <Input
          value={passwordOfOrganization}
          setValue={setPassword}
          placeholder={'Пароль'}
        />
        <p className={style.description}>
          Если у вас есть организация, выберите в пункте меню "Мои организации", но перед этим вам нужно авторизоваться
        </p>
        <button
          onClick={() => {
            addOrganization()
          }}
          className={style.button}
        >
          Создать
        </button>
      </div>
    </motion.div>
  )
}
