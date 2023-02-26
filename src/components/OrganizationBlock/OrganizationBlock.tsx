import { FC, memo, useEffect, useState } from 'react'
import style from './styles/OrganizationBlock.module.scss'
import { motion } from 'framer-motion'
import {
  sessionInterface,
  sessionInterfacePublic,
  sessionsInterface,
} from '../../helpers/interfaces'
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
import UpdatePopup from '../Popups/UpdatePopup/UpdatePopup'
import { User } from '@firebase/auth'
import { deleteOrganizationInPublic, getDocInFirestore, getLink, setItemInFirestore, updateOrganization } from '../../helpers/firestore'
import { DocumentSnapshot } from '@firebase/firestore'

interface OrganizationBlockProps {
  session: sessionInterface | sessionInterfacePublic
  deleteOrganization: Function
  index: number
  refreshData: Function
  userData: User | null
}

const OrganizationBlock: FC<OrganizationBlockProps> = (props) => {
  const [isCheckPassword, handleIsCheckPassword] = useState<boolean>(false)
  const [warningPopup, handleWarningPopup] = useState<boolean>(false)
  const [isPublicDelete, handlePublicDelete] = useState<boolean>(false)

  const [innerData, setInnerData] = useState<sessionInterface | null>(null)
  // const [innerDataLoaded, handleInnerDataLoaded] = useState<boolean>(false)

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
    if (props.userData) {
      await updateOrganization(props.userData, props.session.id, props.session.owner, title, password)
      props.refreshData()
    }
  }

  const getSessionData = async (session: sessionInterfacePublic) => {
    const rawData = (await getDocInFirestore(
      'sessions',
      session.owner
    )) as DocumentSnapshot<sessionsInterface>
    const data = rawData.data()
    if (data) {
      const sessionIndex = data.sessions.findIndex((item) => item.id === session.id)
      if (sessionIndex !== -1) {
        const innerData = data.sessions[sessionIndex]
        setInnerData(innerData)
        return innerData
      }
    }
  }

  useEffect(() => {
    if (props.session) {
      getSessionData(props.session)
    }
  }, [])

  const getOwner = () => {
    return innerData?.users.find((item) => item.uid === props.session.owner)
  }

  const getLengthOfTables = (session: sessionInterface) => {
    return session.tables.length
  }

  const getLengthOfColumns = (session: sessionInterface) => {
    let lengthOfColumns = 0
    session.tables.forEach((table) => {
      if (table.columns) {
        lengthOfColumns += table.columns.length
      }
    })
    return lengthOfColumns
  }

  const getLengthOfBlocks = (session: sessionInterface) => {
    let lengthOfBlocks = 0
    session.tables.forEach((table) => {
      if (table.blocks) {
        lengthOfBlocks += table.blocks.length
      }
    })
    return lengthOfBlocks
  }

  return (
    <>
      <Popup
        callback={async () => {
          if (isPublicDelete) {
            if (props.userData) {
              await deleteOrganizationInPublic(props.userData, props.session.id, props.session.owner)
            }
          } else {
            props.deleteOrganization(props.index)
          }
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
        layout={true}
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
            {getOwner()?.avatar &&
              <Image
                className={style.avatarOwner}
                referrerPolicy={'no-referrer'}
                width={60}
                height={60}
                src={getOwner()?.avatar || ''}
                alt={'avatarOwner'}
              />
            }
            <div className={style.ownerText}>
              <span className={style.value}>{getOwner()?.name}</span>
              <span className={style.value}>{getOwner()?.email}</span>
            </div>
          </div>
        </div>
        <div className={style.blockOfCounters}>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={tableIcon} alt={'table'} />
            <span className={style.counterText}>{innerData && getLengthOfTables(innerData)}</span>
          </div>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={columnIcon} alt={'column'} />
            <span className={style.counterText}>{innerData && getLengthOfColumns(innerData)}</span>
          </div>
          <div className={style.counter}>
            <Image className={style.counterIcon} src={blockIconWithoutDot} alt={'block'} />
            <span className={style.counterText}>{innerData && getLengthOfBlocks(innerData)}</span>
          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.iconButtons}>
            <IconButton onClickCallback={() => {
              handleWarningPopup(true)
              if (props.userData?.uid !== props.session.owner) {
                handlePublicDelete(true)
              } else {
                handlePublicDelete(false)
              }
            }}>
              <Image className={'icon'} src={trashIcon} alt={'trash'} />
            </IconButton>
            {props.userData?.uid === props.session.owner && (
              <IconButton onClickCallback={() => handlePopupVisible((prev) => !prev)}>
                <Image className={'icon'} src={editIcon} alt={'edit'} />
              </IconButton>
            )}
          </div>
          <button
            onClick={() => {
              localStorage.setItem('organization', JSON.stringify(innerData))
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
