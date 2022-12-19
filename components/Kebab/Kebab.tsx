import { Dispatch, FC, memo, SetStateAction } from 'react'
import Image from 'next/image'
import style from '/styles/pages/Organization.module.scss'
import kebab from '/public/icons/kebab.svg'

interface KebabButtonI {
  handleMenu: Dispatch<SetStateAction<boolean>>
  menuIsOpen: boolean
}

export const KebabButton: FC<KebabButtonI> = memo((props) => {
  return (
    <button onClick={() => props.handleMenu(!props.menuIsOpen)}>
      <Image className={style.icon} src={kebab} alt={'kebab'} />
    </button>
  )
})