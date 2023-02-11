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

interface MyOrganizationsProps {}

const Index: NextPage<MyOrganizationsProps> = (props) => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [arrayOfProjects, setArrayOfProjects] = useState<sessionsInterface | null>(null)

  // <sessionsDataI[] | null>

  useEffect(() => {
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
          <h2 className={style.title}>Мои организации</h2>
          <motion.div layout={true} className={style.organizationsList}>
            {arrayOfProjects?.sessions && (
              arrayOfProjects.sessions.map((session) => {
                return (
                  <motion.div layout={true} className={style.organizationBlock}>
                    <h3 className={style.organizationTitle}>
                      ID: {session.id}
                    </h3>
                    <span>
                      Имя организации: {session.title}
                    </span>
                    <span>
                      Пароль организации: {session.password}
                    </span>
                  </motion.div>
                )
              })
            )}
            {!arrayOfProjects?.sessions && (
              <p className={style.description}>
                У вас нет досок
              </p>
            )}
          </motion.div>
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
