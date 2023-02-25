import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import { Header } from '../../src/modules/Header/Header'
import Table from '../../src/modules/Table/Table'
import ButtonAddTable from '../../src/ui/Buttons/ButtonAddTable'
import { User } from '@firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { AddSessionPopup } from '../../src/components/Popups/AddSessionPopup/AddSessionPopup'
import { getSession, getUser } from '../../src/helpers/firestore'
import { sessionInterface, sessionsInterface, tableInterface } from '../../src/helpers/interfaces'
import { doc, onSnapshot } from '@firebase/firestore'
import { db } from '../../data/firebase/firebase'

const Organization: NextPage = memo(() => {
  const [sessionData, setSessionData] = useState<sessionInterface | null>(null)
  const [tables, setTables] = useState<tableInterface[]>([])
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const errors = ['ОГО вас нет в списках']

  const initial = async () => {
    const user = getUser(setUserData)
    if (user) {
      const session = await getSession(setSessionData, user.uid)
      if (session) {
        onSnapshot(doc(db, 'sessions', user.uid), (doc) => {
          const data = doc.data() as sessionsInterface
          if (data) {
            const preparedData = data.sessions.find((item) => item.id === session.id)
            if (preparedData) {
              setSessionData(preparedData)
              setTables(preparedData.tables)
            }
          }
        })
      }
    } else {
      await router.push('/')
    }
  }

  useEffect(() => {
    initial()
  }, [])

  return (
    <>
      <Head>
        <title>{sessionData?.title || 'Home'}</title>
      </Head>

      <AnimatePresence>
        {addSessionPopup && (
          <AddSessionPopup handleAddSessionPopup={handleAddSessionPopup} userData={userData} />
        )}
      </AnimatePresence>

      <Wrapper maxWidth={'110rem'}>
        <Header
          organization={
            typeof router.query.organizationName === 'string' ? router.query.organizationName : ''
          }
          handleAddSessionPopup={handleAddSessionPopup}
          setUserData={setUserData}
          userData={userData}
        />
        {sessionData && tables && (
          <main className={style.main}>
            {sessionData.tables.map((table, index) => {
              // console.log(table, index)
              return (
                <Table
                  key={index}
                  id={table.id}
                  title={table.title}
                  index={index}
                  session={sessionData}
                />
              )
            })}
            <ButtonAddTable session={sessionData} />
          </main>
        )}
      </Wrapper>
    </>
  )
})

Organization.displayName = 'Organization'
export default Organization
