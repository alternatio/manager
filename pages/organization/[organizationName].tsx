import { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'
import { Wrapper } from '../../components/Wrapper/Wrapper'
import { Header } from '../../components/Header/Header'
import { sessionDataTableI } from '../../data/sessionsData'
import Table from '../../components/Organization/Table/Table'
import ButtonAddTable from '../../components/Organization/Buttons/ButtonAddTable'

const Organization: NextPage = memo(() => {
  const [data, setData] = useState<sessionDataTableI[]>([])
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{router.query.organizationName || 'Home'}</title>
      </Head>
      <Wrapper maxWidth={'110rem'}>
        <Header
          organization={
            typeof router.query.organizationName === 'string' ? router.query.organizationName : ''
          }
        />
        <main className={style.main}>
          {data.map((table, index) => {
            return (
              <Table
                key={index}
                title={table.title}
                index={index}
                data={data}
                setData={setData}
                id={table.id}
              />
            )
          })}
          <ButtonAddTable data={data} setData={setData} />
        </main>
      </Wrapper>
    </>
  )
})

Organization.displayName = 'Organization'
export default Organization
