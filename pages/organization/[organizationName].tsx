import { PureComponent } from 'react'
import Head from 'next/head'
import style from '/styles/pages/Organization.module.scss'
import { Wrapper } from '../../components/Wrapper/Wrapper'
import { Header } from '../../components/Header/Header'
import { router } from 'next/client'

type OrganizationProps = {}

type OrganizationStates = {}

class Organization extends PureComponent<OrganizationProps, OrganizationStates> {
  state = {}

  componentDidMount() {
    console.log(router.query.organizationName)
  }

  render() {
    return (
      <>
        <Head>
          <title>{router.query.organizationName}</title>
        </Head>
        <Wrapper maxWidth={'86rem'}>
          <Header />
          <main className={style.main}>
            <div className={style.table}>

            </div>
            <div
              onClick={() => {}}
              className={style.addTable}>

            </div>
          </main>
        </Wrapper>
      </>
    )
  }
}

export default Organization
