import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@firebase/auth'
import { provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'

export const signInWithGooglePopup = (setUserData: Dispatch<SetStateAction<User | null>>) => {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      setUserData(user)
      localStorage.setItem('user', JSON.stringify(user))
    })
    .catch((error) => {
      console.error(error)
      GoogleAuthProvider.credentialFromError(error)
    })
}

export const signOutWithGooglePopup = (setUserData: Dispatch<SetStateAction<User | null>>) => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      setUserData(null)
      localStorage.removeItem('user')
      console.log('sign-out successful')
    })
    .catch((error) => {
      console.error(error)
      GoogleAuthProvider.credentialFromError(error)
    })
}
