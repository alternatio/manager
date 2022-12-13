import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'
import { Wrapper } from '../../components/Wrapper/Wrapper'
import { Header } from '../../components/Header/Header'
import { useRouter } from 'next/router'

import cross from '/public/icons/cross.svg'
import topArrow from '/public/icons/topArrow.svg'
import search from '/public/icons/search.svg'
import kebab from '/public/icons/kebab.svg'
import rename from '/public/icons/rename.svg'
import trash from '/public/icons/trash.svg'

import Image from 'next/image'
import { sessionsDataI } from '../../data/sessionsData'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'

interface TableI {
  title: string
  index: number
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const Table: FC<TableI> = memo((props) => {
  const [menuIsOpen, handleMenu] = useState<boolean>(false)
  const [renameTitle, handleRenameTitle] = useState<boolean>(false)

  return (
    <div className={style.table}>
      <header className={style.header}>
        <div className={style.headerLeftPart}>
          {renameTitle ? (
            <label className={style.label}>
              <input
                className={style.input}
                defaultValue={props.data[props.index].title}
                onChange={(e) => {
                  let backupData = props.data
                  backupData[props.index].title = e.target.value
                  props.setData(backupData)
                }}
                type='text'
              />
            </label>
          ) : (
            <span className={style.headerTitle}>{props.data[props.index].title}</span>
          )}
          <button>
            <Image className={style.icon} src={search} alt={'search'} />
          </button>
          <button onClick={() => handleMenu(!menuIsOpen)}>
            <Image className={style.icon} src={kebab} alt={'kebab'} />
          </button>
          <AnimatePresence>
            {menuIsOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={style.menu}
              >
                <button
                  onClick={() => handleRenameTitle(!renameTitle)}
                  className={style.menuButton}
                >
                  <Image className={style.icon} src={rename} alt={'rename'} />
                  <span>Переименовать</span>
                </button>
                <button className={style.menuButton}>
                  <Image className={style.icon} src={trash} alt={'trash'} />
                  <span>Удалить таблицу</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className={style.arrow}>
          <Image src={topArrow} alt={'arrow'} />
        </button>
      </header>
      <main className={style.tableMain}>
        <div className={style.addColumn}>
          <Image className={style.icon} src={cross} alt={'cross'} />
          <span>Добавить Колонку</span>
        </div>
      </main>
    </div>
  )
})

const Organization: NextPage = () => {
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
              setData((prevState) => [...prevState, { title: 'Новая таблица' }])
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
}

export default memo(Organization)
