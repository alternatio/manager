import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@firebase/firestore'
import { userInterface } from './interfaces'

export const getDocInFirestore = async (collectionName: string, docName: string) => {
  return await getDoc(doc(db, collectionName, docName))
}

export const getCollectionInFirestore = async (collectionName: string) => {
  const response = await getDocs(collection(db, collectionName))
  return response.docs
}

// add item in firestore
export const addItemInFirestore = async (collectionName: string, data: object) => {
  await addDoc(collection(db, collectionName), data)
}

// set item in firestore
export const setItemInFirestore = async (collectionName: string, docName: string, data: object) => {
  await setDoc(doc(db, collectionName, docName), data)
}

// get items from firestore and set in state
export const getItemsFromFirestore = async (
  collectionName: string,
  setData: Dispatch<SetStateAction<unknown>>
) => {
  const data = await getDocs(collection(db, collectionName))
  setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}

// sign in app with Google
export const signInWithGooglePopup = async (setUserData: Dispatch<SetStateAction<User | null>>) => {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      const userObject: userInterface = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      }
      setItemInFirestore('users', user.uid, userObject)

      setUserData(user)
      localStorage.setItem('user', JSON.stringify(user))
    })
    .catch((error) => {
      console.error(error)
      GoogleAuthProvider.credentialFromError(error)
    })
}

// sign out in app with Google
export const signOutWithGooglePopup = async (
  setUserData: Dispatch<SetStateAction<User | null>>
) => {
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
