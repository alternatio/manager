import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import { Header } from '../../src/modules/Header/Header'
import { User } from '@firebase/auth'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { AddSessionPopup } from '../../src/components/Popups/AddSessionPopup/AddSessionPopup'

const Index: NextPage = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)

  useEffect(() => {
    const data = localStorage.getItem('user')
    data && console.log(JSON.parse(data))
    data && setUserData(JSON.parse(data))
  }, [])

  return (
    <>
      <Head>
        <title>О проекте</title>
      </Head>

      <AnimatePresence>
        {addSessionPopup && (
          <AddSessionPopup handleAddSessionPopup={handleAddSessionPopup} userData={userData} />
        )}
      </AnimatePresence>

      <Wrapper maxWidth={'66rem'}>
        <Header
          userData={userData}
          handleAddSessionPopup={handleAddSessionPopup}
          setUserData={setUserData}
        />
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
