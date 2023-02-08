import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { User } from '@firebase/auth'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import Head from 'next/head'
import { Header } from '../../src/modules/Header/Header'
import style from '../../styles/pages/MyOrganizations.module.scss'

interface MyOrganizationsProps {}

const Index: NextPage<MyOrganizationsProps> = (props) => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('user')
    data && console.log(JSON.parse(data))
    data && setUserData(JSON.parse(data))
  }, [])

  const getUserData = () => {

  }

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
          <h2 className={style.title}>
            Мои организации
          </h2>
          <div className={style.organizationsList}>

          </div>
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
