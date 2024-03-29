import { FC, memo } from 'react'
import style from './styles/Intro.module.scss'
import { Cube } from '../../ui/CubeOfIntro/Cube'

const colorsOfCubes: string[] = ['#0011ff', '#ff0033', '#ffee00']

export const Intro: FC = memo(() => {
  return (
    <div className={style.intro}>
      <h2 className={style.helloWord}>Manage your work</h2>
      <p className={style.helloDescription}>Покажет, какую работу вы выполните</p>
      <div className={style.cubes}>
        {colorsOfCubes.map((value, index) => {
          return <Cube key={index} color={value} index={index} />
        })}
      </div>
    </div>
  )
})

Intro.displayName = 'Intro'