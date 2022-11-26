import style from '../styles/pages/Home.module.scss'
import { memo } from 'react'
import { NextPage } from 'next'
import { Wrapper } from '../components/Wrapper/Wrapper'
import { Header } from '../components/Header/Header'
import { Intro } from '../components/Intro/Intro'
import { Percents } from '../components/Percents/Percents'
import { Trader } from '../components/Trader/Trader'

const Home: NextPage = () => {
  return (
    <Wrapper maxWidth={'66rem'}>
      <Header />
      <div className={style.content}>
        <Intro />
        <Percents />
        <Trader />
        <div></div>
      </div>
    </Wrapper>
  )
}

export default memo(Home)
