import { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'

import { Wrapper } from '../../components/Wrapper/Wrapper'
import { Header } from '../../components/Header/Header'

import cross from '/public/icons/cross.svg'

import { sessionsDataI } from '../../data/sessionsData'
import { addItemToData } from '../../functions/addBlocks'
import Table from '../../components/Organization/Table/Table'

const Organization: NextPage = memo(() => {
  const [data, setData] = useState<sessionsDataI[]>([])
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{router.query.organizationName}</title>
      </Head>
      <Wrapper maxWidth={'86rem'}>
        <Header
          organization={
            typeof router.query.organizationName === 'string' ? router.query.organizationName : ''
          }
        />
        <main className={style.main}>
          {data.map((value, index) => {
            return (
              <Table key={index} title={value.title} index={index} data={data} setData={setData} />
            )
          })}
          <div
            onClick={() => {
              addItemToData(setData, data)
            }}
            className={style.addTable}
          >
            <Image className={style.icon} src={cross} alt={'cross'} />
            <span>Добавить таблицу</span>
          </div>
        </main>
      </Wrapper>
    </>
  )
})

export default Organization
