import { PureComponent } from 'react'
import style from '/styles/components/Popup.module.scss'
import { motion } from 'framer-motion'
import arrow from '/public/icons/arrow.svg'
import Image from 'next/image'
import { sessionsData } from '../../../data/sessionsData'
import { NextRouter, useRouter } from 'next/router'
import { getRandomId } from '../../../functions/global'
import { db } from '../../../data/firebase/firebase'
import { addDoc, collection } from '@firebase/firestore'
import Link from 'next/link'

type AddSessionPopupPropsRouter = {
  handleAddSessionPopup: Function
}

type AddSessionPopupProps = {
  handleAddSessionPopup: Function
  router: NextRouter
}

type AddSessionPopupStates = {
  error: boolean
  nameOfOrganization: string
}

export const AddSessionPopupRouter = (props: AddSessionPopupPropsRouter) => {
  const router = useRouter()
  return <AddSessionPopup {...props} router={router} />
}

export class AddSessionPopup extends PureComponent<AddSessionPopupProps, AddSessionPopupStates> {
  state = {
    error: false,
    nameOfOrganization: '',
    passwordOfOrganization: ''
  }

  keyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.addOrganization()
    }
    if (e.key === 'Escape') {
      this.closePopup()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown)
  }

  closePopup = () => {
    this.props.handleAddSessionPopup(false)
  }

  setNameOfOrganization = (name: string) => {
    this.setState({ nameOfOrganization: name })
  }

  setError = (value: boolean) => {
    this.setState({ error: value })
  }

  addOrganization = () => {
    const nameVoid = this.state.nameOfOrganization === ''
    this.validation(nameVoid)
    if (!nameVoid) {
      sessionsData.push({ id: getRandomId(), title: this.state.nameOfOrganization })
      this.props.router.push(`/organization/${this.state.nameOfOrganization}`)

      console.log(db)

      try {
        const docRef = addDoc(collection(db, 'users'), {
          firstName: 'Nikita'
        })
        console.log('doc: ', docRef)
      } catch (e) {
        console.error(e)
      }
    }
  }

  validation = (nameVoid: boolean) => {
    nameVoid ? this.setError(true) : this.setError(false)
  }

  animateOnValidation = () => {
    return this.state.error
      ? { boxShadow: '#ff0033 inset 0 0 0 .2rem' }
      : { boxShadow: '#ff0033 inset 0 0 0 0' }
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
            animate={this.animateOnValidation()}
            className={style.label}
          >
            <input
              autoFocus={true}
              onChange={(e) => this.setNameOfOrganization(e.target.value)}
              className={style.inputBold}
              type='text'
              placeholder={'Название организации'}
              maxLength={50}
              required
            />
          </motion.label>
          <motion.label
            animate={this.animateOnValidation()}
            className={style.label}
          >
            <input
              onChange={(e) => this.setNameOfOrganization(e.target.value)}
              className={style.inputBold}
              type='text'
              placeholder={'Пароль'}
              maxLength={50}
              required
            />
          </motion.label>
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
