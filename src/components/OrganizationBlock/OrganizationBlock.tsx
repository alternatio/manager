import { FC, memo, SetStateAction, useState } from 'react'
import style from './styles/OrganizationBlock.module.scss'
import { motion } from 'framer-motion'
import { sessionInterface } from '../../helpers/interfaces'
import { commonAnimation, commonTransition } from '../../ui/animations/commonAnimations'
import IconButton from '../../ui/Buttons/IconButton'
import Image from 'next/image'
import { editIcon, eyeIcon, trashIcon } from '../../helpers/importIcons'
import Popup from '../Popups/warningPopup/Popup'

interface OrganizationBlockProps {
  session: sessionInterface
}

const OrganizationBlock: FC<OrganizationBlockProps> = ({ session }) => {
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
        callback={() => {}}
        warningPopup={warningPopup}
        handleWarningPopup={handleWarningPopup}
        text={`Удалить организацию «${session.title}»?`}
      />

      <motion.div
        variants={{}}
        {...commonAnimation}
        transition={commonTransition()}
        className={style.organizationBlock}
      >
        <h3 className={style.organizationTitle}>ID: {session.id}</h3>
        <div className={style.label}>
          <span className={style.title}>Имя: </span>
          <span>{session.title}</span>
        </div>
        <div className={style.password}>
          <div className={style.label}>
            <span className={style.title}>Пароль: </span>
            <span>{isCheckPassword ? session.password : getDots(session.password.length)}</span>
          </div>
          <IconButton onClickCallback={() => handleIsCheckPassword((prevState) => !prevState)}>
            <Image
              className={`icon ${style.icon}`}
              style={isCheckPassword ? { opacity: 1 } : { opacity: 0.5 }}
              src={eyeIcon}
              alt={'eye'}
            />
          </IconButton>
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
            Смотреть
          </button>
        </div>
      </motion.div>
    </>
  )
}

OrganizationBlock.displayName = 'OrganizationBlock'
export default memo(OrganizationBlock)
