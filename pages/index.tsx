import style from '../styles/pages/Home.module.scss'
import { memo, useEffect, useState } from 'react'
import { Wrapper } from '../src/ui/Wrapper/Wrapper'
import { Header } from '../src/modules/Header/Header'
import { Intro } from '../src/modules/Intro/Intro'
import { Percents } from '../src/modules/Percents/Percents'
import { Trader } from '../src/modules/Trader/Trader'
import Footer from '../src/modules/Footer/Footer'
import { AddSessionPopup } from '../src/components/Popups/AddSessionPopup/AddSessionPopup'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { NextPage } from 'next'
import { User } from '@firebase/auth'
import { getUser } from '../src/helpers/firestore'

const Home: NextPage = () => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    getUser(setUserData)
  }, [])

  return (
    <>
      <Head>
        <title>PM</title>
      </Head>

      <AnimatePresence>
        {addSessionPopup && (
          <AddSessionPopup handleAddSessionPopup={handleAddSessionPopup} userData={userData} />
        )}
      </AnimatePresence>

      <Wrapper maxWidth={'66rem'}>
        <Header
          userData={userData}
          setUserData={setUserData}
          handleAddSessionPopup={handleAddSessionPopup}
        />
        <div className={style.content}>
          <Intro />
          <Percents />
          <Trader
            handleAddSessionPopup={handleAddSessionPopup}
            setUserData={setUserData}
            userData={userData}
          />
          <Footer />
        </div>
      </Wrapper>
    </>
  )
}

export default memo(Home)
