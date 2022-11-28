import { FC, memo } from 'react'
import style from '/styles/components/Footer.module.scss'

export const Footer: FC = memo(() => {
  return (
    <div className={style.Footer}>
      <div className={style.part}>
        <span>2022</span>
      </div>
      <div className={style.part}>
        <span>Разработчик: alternatio</span>
        <a className={style.link} href='https://vk.com/modiris' target='_blank'>
          VK
        </a>
        <a className={style.link} href='https://t.me/Alternati0' target='_blank'>
          Telegram
        </a>
        <a className={style.link} href='https://github.com/alternatio' target='_blank'>
          Github
        </a>
      </div>
    </div>
  )
})
