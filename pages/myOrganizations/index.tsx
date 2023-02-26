import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { User } from '@firebase/auth'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import Head from 'next/head'
import { Header } from '../../src/modules/Header/Header'
import style from '../../styles/pages/MyOrganizations.module.scss'
import { getDocInFirestore, getUser, setItemInFirestore } from '../../src/helpers/firestore'
import {
  sessionInterface,
  sessionInterfacePublic,
  sessionsInterface,
} from '../../src/helpers/interfaces'
import { AnimatePresence } from 'framer-motion'
import { CreateSessionPopup } from '../../src/components/Popups/CreateSessionPopup/CreateSessionPopup'
import OrganizationBlock from '../../src/components/OrganizationBlock/OrganizationBlock'
import IconButton from '../../src/ui/Buttons/IconButton'
import Image from 'next/image'
import { refreshIcon } from '../../src/helpers/importIcons'

const Index: NextPage = () => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)

  const [ownerProjects, setOwnerProjects] = useState<sessionInterface[] | null>(null)
  const [publicProjects, setPublicProjects] = useState<sessionInterfacePublic[] | null>(null)

  const [loading, handleLoading] = useState<boolean>(true)

  const refreshData = async () => {
    handleLoading(true)
    const user = getUser(setUserData)
    if (user) {
      const doc = await getDocInFirestore('sessions', user.uid)
      const data = doc.data() as sessionsInterface
      if (data) {
        setOwnerProjects(data.sessions)
        setPublicProjects(data.publicSessions)
        handleLoading(false)
      }
    }
  }

  useEffect(() => {
    localStorage.removeItem('organization')
    refreshData()
  }, [])

  const deleteOrganization = async (
    indexOfOrganization: number,
    ownerProjects?: sessionInterface[],
    publicProjects?: sessionInterfacePublic[]
  ) => {
    const owner = userData?.uid
    if (ownerProjects && owner) {
      const resultArray = ownerProjects
      resultArray.splice(indexOfOrganization, 1)
      const resultObject = {
        owner: owner,
        sessions: resultArray,
      }
      console.log(resultObject)
      console.log(indexOfOrganization)
      await setItemInFirestore('sessions', owner, resultObject)
    }
  }

  return (
    <>
      <Head>
        <title>Мои организации</title>
      </Head>

      <AnimatePresence>
        {addSessionPopup && (
          <CreateSessionPopup handleAddSessionPopup={handleAddSessionPopup} userData={userData} />
        )}
      </AnimatePresence>

      <Wrapper maxWidth={'66rem'}>
        <Header
          userData={userData}
          setUserData={setUserData}
          handleAddSessionPopup={handleAddSessionPopup}
        />
        <main className={style.main}>
          {loading && <span>Загрузка</span>}
          {!loading && (
            <>
              <h2 className={style.title}>
                <span>Мои организации</span>
                <IconButton onClickCallback={() => refreshData()}>
                  <Image className={'icon'} src={refreshIcon} alt={'refresh'} />
                </IconButton>
              </h2>
              <div className={style.organizationsList}>
                {ownerProjects?.map((project, index) => {
                  return (
                    <OrganizationBlock
                      key={index}
                      index={index}
                      session={project}
                      refreshData={refreshData}
                      userData={userData}
                      deleteOrganization={deleteOrganization}
                    />
                  )
                })}
                {!ownerProjects?.length && (
                  <span className={style.description}>
                    У вас нет своих досок. Может создать? Это можно сделать через верхнее правое
                    меню
                  </span>
                )}
              </div>
              <h2 className={style.title}>
                <span>Мои присоединённые организации</span>
              </h2>
              <div className={style.organizationsList}>
                {publicProjects?.map((project, index) => {
                  return (
                    <OrganizationBlock
                      key={index}
                      index={index}
                      session={project}
                      refreshData={refreshData}
                      userData={userData}
                      deleteOrganization={deleteOrganization}
                    />
                  )
                })}
                {!publicProjects?.length && (
                  <span className={style.description}>
                    У вас нет присоединённых досок. Может присоединиться? Это можно сделать через
                    верхнее правое меню
                  </span>
                )}
              </div>
            </>
          )}
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
