import { FC, memo } from 'react'
import style from '/styles/components/Percents.module.scss'

const blocks: { percents: string; nameOfBlock: string }[] = [
  {
    percents: '10%',
    nameOfBlock: 'UI',
  },
  {
    percents: '10%',
    nameOfBlock: 'UX',
  },
  {
    percents: '80%',
    nameOfBlock: 'PEO\nPLE',
  },
]

export const Percents: FC = memo(() => {
  return (
    <div className={style.Percents}>
      <div className={style.blocks}>
        {blocks.map((object) => {
          return (
            <div className={style.block}>
              <div className={style.cube}>{object.percents}</div>
              <p className={style.blockText}>{object.nameOfBlock}</p>
            </div>
          )
        })}
      </div>
      <div className={style.textBlock}>
        <p className={style.text}>
          <span className={style.accent}>Project Manager</span> помогает вам назначать главные задачи, ставить цели и определять
          последовательность работы.
        </p>
      </div>
    </div>
  )
})
