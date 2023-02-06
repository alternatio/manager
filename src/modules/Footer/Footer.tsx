import { FC, memo } from 'react'
import style from './styles/Footer.module.scss'
import Link from 'next/link'

const Footer: FC = () => {
  return (
    <div className={style.Footer}>
      <div className={style.part}>
        <span>2022</span>
      </div>
      <div className={style.part}>
        <span>Разработчик: alternatio</span>
        <Link className={style.link} href='https://vk.com/modiris' target='_blank' rel='noreferrer'>
          VK
        </Link>
        <Link className={style.link} href='https://t.me/Alternati0' target='_blank' rel='noreferrer'>
          Telegram
        </Link>
        <Link
          className={style.link}
          href='https://github.com/alternatio'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </Link>
      </div>
    </div>
  )
}

Footer.displayName = 'Footer'
export default memo(Footer)
