import { NextPage } from 'next'
import { memo, useEffect, useState } from 'react'
import { User } from '@firebase/auth'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import Head from 'next/head'
import { Header } from '../../src/modules/Header/Header'
import style from '../../styles/pages/MyOrganizations.module.scss'
import { getDocInFirestore, setItemInFirestore } from '../../src/helpers/firestore'
import { sessionsInterface } from '../../src/helpers/interfaces'
import { AnimatePresence, motion } from 'framer-motion'
import { AddSessionPopup } from '../../src/components/Popups/AddSessionPopup/AddSessionPopup'
import OrganizationBlock from '../../src/components/OrganizationBlock/OrganizationBlock'
import IconButton from '../../src/ui/Buttons/IconButton'
import Image from 'next/image'
import { refreshIcon } from '../../src/helpers/importIcons'

interface MyOrganizationsProps {}

const Index: NextPage<MyOrganizationsProps> = (props) => {
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [arrayOfProjects, setArrayOfProjects] = useState<sessionsInterface | null>(null)
  const [loading, handleLoading] = useState<boolean>(true)

  const refreshData = () => {
    handleLoading(true)
    setArrayOfProjects(null)
    const data = localStorage.getItem('user')
    if (data) {
      const parsedData = JSON.parse(data)
      setUserData(parsedData)

      getDocInFirestore('sessions', parsedData.uid)
        .then((response) => {
          const data = response.data() as sessionsInterface
          if (data) {
            setArrayOfProjects(data)
            handleLoading(false)
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

  const deleteOrganization = async (indexOfOrganization: number) => {
    const owner = userData?.uid
    if (arrayOfProjects?.sessions && owner) {
      const resultArray = arrayOfProjects.sessions
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
              <Image className={'icon'} src={refreshIcon} alt={'refresh'} />
            </IconButton>
          </h2>
          <motion.div layout={true} className={style.organizationsList}>
            {loading && <span>Загрузка</span>}
            {arrayOfProjects?.sessions &&
              arrayOfProjects.sessions.map((session, index) => {
                return (
                  <OrganizationBlock
                    key={index}
                    session={session}
                    deleteOrganization={deleteOrganization}
                    index={index}
                    refreshData={refreshData}
                  />
                )
              })}
            {!arrayOfProjects?.sessions.length && !loading && <p className={style.description}>У вас нет досок. Может создать? Это можно сделать в меню сверху</p>}
          </motion.div>
        </main>
      </Wrapper>
    </>
  )
}

Index.displayName = 'Index'
export default memo(Index)
