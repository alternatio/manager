import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'
import { Wrapper } from '../../src/ui/Wrapper/Wrapper'
import { Header } from '../../src/modules/Header/Header'
import { sessionDataTableI } from '../../data/sessionsData'
import Table from '../../src/modules/Table/Table'
import ButtonAddTable from '../../src/ui/Buttons/ButtonAddTable'
import { User } from '@firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { AddSessionPopup } from '../../src/components/Popups/AddSessionPopup/AddSessionPopup'

const Organization: NextPage = memo(() => {
  const [data, setData] = useState<sessionDataTableI[]>([])
  const [addSessionPopup, handleAddSessionPopup] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('user')
    data && console.log(JSON.parse(data))
    data && setUserData(JSON.parse(data))
  }, [])

  return (
    <>
      <Head>
        <title>{router.query.organizationName || 'Home'}</title>
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
        <main className={style.main}>
          {data.map((table, index) => {
            return (
              <Table
                key={index}
                title={table.title}
                index={index}
                // @ts-ignore
                data={data}
                // @ts-ignore
                setData={setData}
                id={table.id}
              />
            )
          })}
          <ButtonAddTable
            // @ts-ignore
            data={data}
            // @ts-ignore
            setData={setData}
          />
        </main>
      </Wrapper>
    </>
  )
})

Organization.displayName = 'Organization'
export default Organization
