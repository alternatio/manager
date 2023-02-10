import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { User } from '@firebase/auth'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import Head from 'next/head'
import { Header } from '../../src/modules/Header/Header'
import style from '../../styles/pages/MyOrganizations.module.scss'
import { getDocInFirestore } from '../../src/helpers/firestore'
import { sessionsDataI } from '../../data/sessionsData'

interface MyOrganizationsProps {}

const Index: NextPage<MyOrganizationsProps> = (props) => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [arrayOfProjects, setArrayOfProjects] = useState<unknown>(null)

  // <sessionsDataI[] | null>

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      const parsedData = JSON.parse(data)
      setUserData(parsedData)

      getDocInFirestore('sessions', parsedData.uid)
        .then((response) => {
          setArrayOfProjects(response.data())
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

      <Wrapper maxWidth={'66rem'}>
        <Header
          userData={userData}
          setUserData={setUserData}
          handleAddSessionPopup={handleAddSessionPopup}
        />
        <main className={style.main}>
          <h2 className={style.title}>Мои организации</h2>
          <div className={style.organizationsList}></div>
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
