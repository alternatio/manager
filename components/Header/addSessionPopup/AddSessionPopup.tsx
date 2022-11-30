import { PureComponent } from 'react'
import style from '/styles/components/Popup.module.scss'
import { motion } from 'framer-motion'
import arrow from '/public/icons/arrow.svg'
import Image from 'next/image'
import { sessionsData } from '../../../data/sessionsData'
import { NextRouter, useRouter } from 'next/router'

type AddSessionPopupPropsRouter = {
  handleAddSessionPopup: Function
}

type AddSessionPopupProps = {
  handleAddSessionPopup: Function
  router: NextRouter
}

type AddSessionPopupStates = {
  nameIsVoid: boolean
  nameOfOrganization: string
}

export const AddSessionPopupRouter = (props: AddSessionPopupPropsRouter) => {
  const router = useRouter()
  return <AddSessionPopup {...props} router={router} />
}

export class AddSessionPopup extends PureComponent<AddSessionPopupProps, AddSessionPopupStates> {
  state = {
    nameIsVoid: false,
    nameOfOrganization: '',
  }

  closePopup = () => this.props.handleAddSessionPopup(false)

  setNameOfOrganization = (name: string) => {
    this.setState({ nameOfOrganization: name })
  }

  addOrganization = () => {
    const nameVoid = this.state.nameOfOrganization === ''
    this.validation(nameVoid)
    if (!nameVoid) {
      sessionsData.push({ title: this.state.nameOfOrganization })
      this.props.router.push(`/organization/${this.state.nameOfOrganization}`)
    }
    console.log(!this.state.nameIsVoid, sessionsData)
  }

  validation = (nameVoid: boolean) => {
    nameVoid ? this.setState({ nameIsVoid: true }) : this.setState({ nameIsVoid: false })
  }

  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={style.wrapper}
      >
        <div className={style.body}>
          <button className={style.cancel} onClick={() => this.closePopup()}>
            <Image className={style.cancelImage} src={arrow} alt={'arrowBack'} />
          </button>
          <motion.label
            animate={
              this.state.nameIsVoid
                ? { boxShadow: '#ff0033 inset 0 0 0 .2rem' }
                : { boxShadow: '#ff0033 inset 0 0 0 0' }
            }
            className={style.label}
          >
            <input
              onChange={(e) => this.setNameOfOrganization(e.target.value)}
              className={style.inputBold}
              type='text'
              placeholder={'Название организации'}
              maxLength={50}
              required
            />
          </motion.label>
          {this.state.nameIsVoid && <div className={style.wrongInput}>Введите имя</div>}
          <button
            onClick={() => {
              this.addOrganization()
            }}
            className={style.button}
          >
            Создать
          </button>
        </div>
      </motion.div>
    )
  }
}
