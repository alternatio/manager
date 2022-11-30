import style from '../styles/pages/Home.module.scss'
import { memo, PureComponent } from 'react'
import { Wrapper } from '../components/Wrapper/Wrapper'
import { Header } from '../components/Header/Header'
import { Intro } from '../components/HomeComponents/Intro/Intro'
import { Percents } from '../components/HomeComponents/Percents/Percents'
import { Trader } from '../components/HomeComponents/Trader/Trader'
import { Footer } from '../components/Footer/Footer'
import { AddSessionPopupRouter } from '../components/Header/addSessionPopup/AddSessionPopup'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'

type HomeStates = {
  addSessionPopup: boolean
}

class Home extends PureComponent<{}, HomeStates> {
  state = {
    addSessionPopup: false,
  }

  handleAddSessionPopup = (state: boolean) => {
    this.setState({ addSessionPopup: state })
  }

  render() {
    return (
      <>
        <Head>
          <title>PM</title>
        </Head>

        <AnimatePresence>
          {this.state.addSessionPopup && (
            <AddSessionPopupRouter handleAddSessionPopup={this.handleAddSessionPopup} />
          )}
        </AnimatePresence>

        <Wrapper maxWidth={'66rem'}>
          <Header />
          <div className={style.content}>
            <Intro />
            <Percents />
            <Trader handleAddSessionPopup={this.handleAddSessionPopup} />
            <Footer />
          </div>
        </Wrapper>
      </>
    )
  }
}

export default memo(Home)
