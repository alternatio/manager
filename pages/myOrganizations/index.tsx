import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { User } from '@firebase/auth'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import Head from 'next/head'
import { Header } from '../../src/modules/Header/Header'
import style from '../../styles/pages/MyOrganizations.module.scss'
import { getDocInFirestore } from '../../src/helpers/firestore'
import { sessionsInterface } from '../../src/helpers/interfaces'
import { AnimatePresence, motion } from 'framer-motion'
import { AddSessionPopup } from '../../src/components/Popups/AddSessionPopup/AddSessionPopup'
import OrganizationBlock from '../../src/components/OrganizationBlock/OrganizationBlock'
import IconButton from '../../src/ui/Buttons/IconButton'
import Image from 'next/image'

interface MyOrganizationsProps {}

const Index: NextPage<MyOrganizationsProps> = (props) => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [arrayOfProjects, setArrayOfProjects] = useState<sessionsInterface | null>(null)

  const refreshData = () => {
    const data = localStorage.getItem('user')
    if (data) {
      const parsedData = JSON.parse(data)
      setUserData(parsedData)

      getDocInFirestore('sessions', parsedData.uid)
        .then((response) => {
          const data = response.data() as sessionsInterface
          if (data) {
            setArrayOfProjects(data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  useEffect(() => {
    console.log(arrayOfProjects)
  }, [arrayOfProjects])

  return (
    <>
      <Head>
        <title>Мои организации</title>
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
        <main className={style.main}>
          <h2 className={style.title}>
            <span>Мои организации</span>
            <IconButton onClickCallback={() => refreshData()}>
              <Image src={''} alt={'refresh'} />
            </IconButton>
          </h2>
          <motion.div layout={true} className={style.organizationsList}>
            {arrayOfProjects?.sessions &&
              arrayOfProjects.sessions.map((session, index) => {
                return <OrganizationBlock key={index} session={session} />
              })}
            {!arrayOfProjects?.sessions && <p className={style.description}>У вас нет досок</p>}
          </motion.div>
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
