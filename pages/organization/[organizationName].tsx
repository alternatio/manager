import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'

import { Wrapper } from '../../components/Wrapper/Wrapper'
import { Header } from '../../components/Header/Header'

import cross from '/public/icons/cross.svg'
import topArrow from '/public/icons/topArrow.svg'
import search from '/public/icons/search.svg'
import rename from '/public/icons/rename.svg'
import trash from '/public/icons/trash.svg'

import { sessionsDataI } from '../../data/sessionsData'
import { AnimatePresence, motion } from 'framer-motion'
import { addItemToData } from '../../functions/addBlocks'
import { KebabButton } from '../../components/Kebab/Kebab'

interface TableI {
  title: string
  index: number
  data: sessionsDataI[]
  setData: Dispatch<SetStateAction<sessionsDataI[]>>
}

const Table: FC<TableI> = memo((props) => {
  const [menuIsOpen, handleMenu] = useState<boolean>(false)
  const [renameTitle, handleRenameTitle] = useState<boolean>(false)

  interface PopupMenuTableI {
    handleRenameTitle: Dispatch<SetStateAction<boolean>>
    renameTitle: boolean
  }

  const PopupMenuTable: FC<PopupMenuTableI> = (props) => {
    return (
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={style.menu}
          >
            <button
              onClick={() => props.handleRenameTitle(!props.renameTitle)}
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
    )
  }

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
                  const backupData = props.data
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
          <KebabButton  handleMenu={handleMenu} menuIsOpen={menuIsOpen}/>
          <PopupMenuTable  handleRenameTitle={handleRenameTitle} renameTitle={renameTitle}/>
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

interface ColumnI {}

const Column: FC<ColumnI> = memo((props) => {
  return <div></div>
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
}

export default memo(Organization)
