import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import { Header } from '../../src/modules/Header/Header'
import { User } from '@firebase/auth'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { CreateSessionPopup } from '../../src/components/Popups/CreateSessionPopup/CreateSessionPopup'
import { getUser } from '../../src/helpers/firestore'

const Index: NextPage = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)

  useEffect(() => {
    localStorage.removeItem('organization')
    getUser(setUserData)
  }, [])

  return (
    <>
      <Head>
        <title>О проекте</title>
      </Head>

      <AnimatePresence>
        {addSessionPopup && (
          <CreateSessionPopup handleAddSessionPopup={handleAddSessionPopup} userData={userData} />
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
