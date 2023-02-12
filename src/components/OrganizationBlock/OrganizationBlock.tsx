import { FC, memo, SetStateAction, useEffect, useState } from 'react'
import style from './styles/OrganizationBlock.module.scss'
import { motion } from 'framer-motion'
import { sessionInterface } from '../../helpers/interfaces'
import { commonAnimation, commonTransition } from '../../ui/animations/commonAnimations'
import IconButton from '../../ui/Buttons/IconButton'
import Image from 'next/image'
import { editIcon, eyeIcon, trashIcon } from '../../helpers/importIcons'
import Popup from '../Popups/warningPopup/Popup'
import Link from 'next/link'

interface OrganizationBlockProps {
  session: sessionInterface
  deleteOrganization: Function
  index: number
  refreshData: Function
}

const OrganizationBlock: FC<OrganizationBlockProps> = (props) => {
  const [isCheckPassword, handleIsCheckPassword] = useState<boolean>(false)
  const [isChangeFields, handleIsChangeFields] = useState<boolean>(false)
  const [warningPopup, handleWarningPopup] = useState<boolean>(false)

  const getDots = (length: number) => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += '*'
    }
    return result
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

      

      <motion.div
        variants={{}}
        {...commonAnimation}
        transition={commonTransition(props.index)}
        className={style.organizationBlock}
      >
        <h3 className={style.organizationTitle}>ID: {props.session.id}</h3>
        <div className={style.label}>
          <span className={style.title}>Имя: </span>
          <span className={style.value}>{props.session.title}</span>
        </div>
        <div className={style.password}>
          <span className={style.title}>Пароль: </span>
          <div className={style.passwordLine}>
            <span className={style.value}>{isCheckPassword ? props.session.password : getDots(props.session.password.length)}</span>
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
        <div className={style.buttons}>
          <div className={style.iconButtons}>
            <IconButton onClickCallback={() => handleWarningPopup(true)}>
              <Image className={'icon'} src={trashIcon} alt={'trash'} />
            </IconButton>
            <IconButton onClickCallback={() => {}}>
              <Image className={'icon'} src={editIcon} alt={'edit'} />
            </IconButton>
          </div>
          <button className={style.button}>
            <Link href={`organization/${props.session.title}`}>Смотреть</Link>
          </button>
        </div>
      </motion.div>
    </>
  )
}

OrganizationBlock.displayName = 'OrganizationBlock'
export default memo(OrganizationBlock)
