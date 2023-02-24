import { FC, memo, SetStateAction, useEffect, useState } from 'react'
import style from './styles/OrganizationBlock.module.scss'
import { motion } from 'framer-motion'
import { sessionInterface } from '../../helpers/interfaces'
import { commonAnimation, commonTransition } from '../../ui/animations/commonAnimations'
import IconButton from '../../ui/Buttons/IconButton'
import Image from 'next/image'
import {
  blockIcon,
  blockIconWithoutDot,
  columnIcon,
  editIcon,
  eyeIcon,
  tableIcon,
  trashIcon,
} from '../../helpers/importIcons'
import Popup from '../Popups/warningPopup/Popup'
import Link from 'next/link'
import Input from '../../ui/Input/Input'
import UpdatePopup from '../Popups/UpdatePopup/UpdatePopup'
import { staterArrayOfProjectsI } from '../../../pages/myOrganizations'
import { User } from '@firebase/auth'
import { getLink, setItemInFirestore } from '../../helpers/firestore'

interface OrganizationBlockProps {
  session: sessionInterface
  deleteOrganization: Function
  index: number
  refreshData: Function
  staterArrayOfProjects: staterArrayOfProjectsI
  userData: User | null
}

const OrganizationBlock: FC<OrganizationBlockProps> = (props) => {
  const [isCheckPassword, handleIsCheckPassword] = useState<boolean>(false)
  const [warningPopup, handleWarningPopup] = useState<boolean>(false)

  const [popupIsVisible, handlePopupVisible] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.session.title)
  const [password, setPassword] = useState<string>(props.session.password)

  const getDots = (length: number) => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += '*'
    }
    return result
  }

  const functionOnUpdate = async () => {
    if (props.userData?.uid && props.staterArrayOfProjects.arrayOfProjects) {
      const resultArray = [...props.staterArrayOfProjects.arrayOfProjects.sessions]
      console.log(props.staterArrayOfProjects.arrayOfProjects.sessions)
      resultArray[props.index].title = title
      resultArray[props.index].password = password

      const resultData = {
        owner: props.userData.uid,
        sessions: resultArray,
      }

      await setItemInFirestore('sessions', props.userData.uid, resultData)
      // props.refreshData()
    }
  }

  const getOwner = () => {
    return props.session.users.find((item) => item.uid === props.session.owner)
  }

  const getLengthOfTables = () => {
    return props.session.tables.length
  }

  const getLengthOfColumns = () => {
    let lengthOfColumns = 0
    props.session.tables.forEach((table) => {
      if (table.columns) {
        lengthOfColumns += table.columns.length
      }
    })
    return lengthOfColumns
  }

  const getLengthOfBlocks = () => {
    let lengthOfBlocks = 0
    props.session.tables.forEach((table) => {
      if (table.blocks) {
        lengthOfBlocks += table.blocks.length
      }
    })
    return lengthOfBlocks
  }

  return (
    <>
      <Popup
        callback={() => {
          props.deleteOrganization(props.index)
          props.refreshData()
        }}
        warningPopup={warningPopup}
        handleWarningPopup={handleWarningPopup}
        text={'Вы уверены удалить'}
      >
        <p>«{props.session.title}»?</p>
      </Popup>

      <UpdatePopup
        isVisible={popupIsVisible}
        handleVisible={handlePopupVisible}
        functionOnUpdate={functionOnUpdate}
        arrayOfValues={[title, password]}
        arrayOfFunctions={[setTitle, setPassword]}
        arrayOfPlaceholders={['Имя', 'Пароль']}
      />

      <motion.div
        variants={{}}
        {...commonAnimation}
        transition={commonTransition(props.index)}
        className={style.organizationBlock}
      >
        <div className={style.label}>
          <span className={style.title}>ID:</span>
          <span className={style.value}>{props.session.id}</span>
        </div>
        <div className={style.label}>
          <span className={style.title}>Имя: </span>
          <span className={style.value}>{props.session.title}</span>
        </div>
        <div className={style.password}>
          <span className={style.title}>Пароль: </span>
          <div className={style.passwordLine}>
            <span className={style.value}>
              {isCheckPassword ? props.session.password : getDots(props.session.password.length)}
            </span>
            <IconButton onClickCallback={() => handleIsCheckPassword((prevState) => !prevState)}>
              <Image
                className={`icon ${style.icon}`}
                style={isCheckPassword ? { opacity: 1 } : { opacity: 0.5 }}
                src={eyeIcon}
                alt={'eye'}
              />
            </IconButton>
          </div>
        </div>
        <div className={style.label}>
          <span className={style.title}>Создатель: </span>
          <div className={style.owner}>
            <Image
              className={style.avatarOwner}
              referrerPolicy={'no-referrer'}
              width={60}
              height={60}
              src={getOwner()?.avatar || 'none'}
              alt={'avatarOwner'}
            />
            <div className={style.ownerText}>
              <span className={style.value}>{getOwner()?.name}</span>
              <span className={style.value}>{getOwner()?.email}</span>
            </div>
          </div>
        </div>
        <div className={style.blockOfCounters}>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={tableIcon} alt={'table'} />
            <span className={style.counterText}>{getLengthOfTables()}</span>
          </div>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={columnIcon} alt={'column'} />
            <span className={style.counterText}>{getLengthOfColumns()}</span>
          </div>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={blockIconWithoutDot} alt={'block'} />
            <span className={style.counterText}>{getLengthOfBlocks()}</span>
          </div>
        </div>
        <div className={style.buttons}>
          {props.userData?.uid === props.session.owner && (
            <div className={style.iconButtons}>
              <IconButton onClickCallback={() => handleWarningPopup(true)}>
                <Image className={'icon'} src={trashIcon} alt={'trash'} />
              </IconButton>
              <IconButton onClickCallback={() => handlePopupVisible((prev) => !prev)}>
                <Image className={'icon'} src={editIcon} alt={'edit'} />
              </IconButton>
            </div>
          )}
          <button
            onClick={() => {
              localStorage.setItem('organization', JSON.stringify(props.session))
            }}
            className={style.button}
          >
            <Link href={getLink(props.session.id)}>Смотреть</Link>
          </button>
        </div>
      </motion.div>
    </>
  )
}

OrganizationBlock.displayName = 'OrganizationBlock'
export default memo(OrganizationBlock)
