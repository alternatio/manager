import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/Popup.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { sessionsData, sessionsDataI } from '../../../../data/sessionsData'
import { getRandomId } from '../../../helpers/global'
import { arrowIcon } from '../../../helpers/importIcons'
import Input from '../../../ui/Input/Input'
import { commonAnimation, commonTransition } from '../../../ui/animations/commonAnimations'
import { popupV } from '../../../ui/animations/variants'
import { User } from '@firebase/auth'
import { getDocInFirestore, setItemInFirestore } from '../../../helpers/firestore'
import { DocumentSnapshot } from '@firebase/firestore'
import { sessionsInterface, userInterface } from '../../../helpers/interfaces'

interface AddSessionPopupPropsRouter {
  handleAddSessionPopup: Dispatch<SetStateAction<boolean>>
  userData: User | null
}

type sessionsData = { sessions: sessionsDataI[] }

export const AddSessionPopup: FC<AddSessionPopupPropsRouter> = (props) => {
  const [nameOfOrganization, setName] = useState<string>('')
  const [passwordOfOrganization, setPassword] = useState<string>('')
  const router = useRouter()

  const closePopup = () => {
    props.handleAddSessionPopup(false)
  }

  const addOrganization = async () => {
    if (nameOfOrganization && passwordOfOrganization && props.userData?.uid) {
      const docs = (await getDocInFirestore(
        'sessions',
        props.userData.uid
      )) as DocumentSnapshot<sessionsData>
      const dataOfDocs = docs.data()
      await router.push(`/organization/${nameOfOrganization}`)

      const createSession = async (object: sessionsDataI, userId: string) => {
        const resultArray: sessionsDataI[] = []
        if (dataOfDocs?.sessions) {
          resultArray.push(...dataOfDocs.sessions, object)
        } else {
          resultArray.push(object)
        }
        const resultData: sessionsInterface = {
          owner: userId,
          sessions: resultArray,
        }
        await setItemInFirestore('sessions', userId, resultData)
      }

      const sessionObject: sessionsDataI = {
        id: getRandomId(),
        title: nameOfOrganization,
        password: passwordOfOrganization,
      }

      await createSession(sessionObject, props.userData.uid)

      // if (dataOfDocs) {
      //   if (dataOfDocs.sessions.find((object) => object.title === nameOfOrganization)) {
      //     console.log('multi', dataOfDocs)
      //   } else {
      //     const sessionObject: sessionsDataI = {
      //       id: getRandomId(),
      //       title: nameOfOrganization,
      //       password: passwordOfOrganization,
      //     }
      //     await createSession(sessionObject, props.userData.uid)
      //     console.log('un multi', dataOfDocs)
      //   }
      // }
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
          maxLength={20}
        />
        <Input
          maxLength={16}
          value={passwordOfOrganization}
          setValue={setPassword}
          placeholder={'Пароль'}
        />
        <p className={style.description}>
          Если у вас есть организация, выберите в пункте меню -Мои организации-
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
