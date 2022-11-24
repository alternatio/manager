import style from '../styles/pages/Home.module.scss'
import { memo } from 'react'
import { Wrapper } from '../components/Wrapper/Wrapper'
import { Header } from '../components/Header/Header'

const Home = () => {
  return (
    <Wrapper maxWidth={'66rem'}>
      <Header />
      <div className={style.intro}>
        <h2 className={style.helloWord}>
          Manage your work
        </h2>
        <p className={style.helloDescription}>
          Покажет, какую работу вы выполните
        </p>
        <div className={style.cube}/>
        <div className={style.cube}/>
        <div className={style.cube}/>
      </div>
    </Wrapper>
  )
}

export default memo(Home)
