import { motion } from 'framer-motion'
import { PureComponent } from 'react'
import style from '/styles/components/Trader.module.scss'

import humanFriendlyGif from '/public/gifs/worker.gif'
import madeForPeopleGif from '/public/gifs/wow.gif'
import { Gif } from '../../Gif/Gif'

type TraderProps = {
  handleAddSessionPopup: Function
}

type TraderStates = {
  humanFriendlyHover: boolean
  madeForPeopleHover: boolean
}

export class Trader extends PureComponent<TraderProps, TraderStates> {
  state = {
    humanFriendlyHover: false,
    madeForPeopleHover: false,
  }

  handleHumanFriendlyHover = (state: boolean) => {
    this.setState({ humanFriendlyHover: state })
  }

  handleMadeForPeopleHover = (state: boolean) => {
    this.setState({ madeForPeopleHover: state })
  }

  render() {
    return (
      <div className={style.Trader}>
        <div className={style.pleasant}>
          Pleasant,{' '}
          <motion.span
            className={style.accent}
            onMouseEnter={() => this.handleHumanFriendlyHover(true)}
            onMouseLeave={() => this.handleHumanFriendlyHover(false)}
          >
            *human-friendly,
            <Gif hover={this.state.humanFriendlyHover} full={false} gif={humanFriendlyGif} />
          </motion.span>{' '}
          practical, not commercial,{' '}
          <motion.span
            className={style.accent}
            onMouseEnter={() => this.handleMadeForPeopleHover(true)}
            onMouseLeave={() => this.handleMadeForPeopleHover(false)}
          >
            *made <Gif hover={this.state.madeForPeopleHover} full={false} gif={madeForPeopleGif} />
            for people!
          </motion.span>
        </div>
        <div className={style.start}>
          <p className={style.text}>
            Начните пользоваться <br /> прямо сейчас
          </p>
          <button
            onClick={() => setTimeout(() => this.props.handleAddSessionPopup(true), 250)}
            className={style.button}
          >
            Начать
          </button>
        </div>
      </div>
    )
  }
}
