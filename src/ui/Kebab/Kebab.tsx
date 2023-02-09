import { Dispatch, FC, memo, SetStateAction } from 'react'
import Image from 'next/image'
import style from '/styles/pages/Organization.module.scss'
import { kebabIcon } from '../../helpers/importIcons'

interface KebabButtonI {
  handlePopup: Dispatch<SetStateAction<boolean>>
}

export const KebabButton: FC<KebabButtonI> = memo((props) => {
  return (
    <button className={style.buttonWithIcon} onClick={() => props.handlePopup(prev => !prev)}>
      <Image className={style.icon} src={kebabIcon} alt={'kebab'} />
    </button>
  )
})

KebabButton.displayName = 'Kebab button'
