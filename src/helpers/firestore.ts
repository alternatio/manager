import { getAuth, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from '@firebase/firestore'
import { userInterface } from './interfaces'

// get doc in firestore
export const getDocInFirestore = async (collectionName: string, docName: string) => {
  return await getDoc(doc(db, collectionName, docName))
}

// get collection in firestore
export const getCollectionInFirestore = async (collectionName: string) => {
  return await getDocs(collection(db, collectionName))
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
  try {
    const response = await signInWithPopup(auth, provider)
    const user = response.user
    const userObject: userInterface = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    }
    setItemInFirestore('users', user.uid, userObject)
    setUserData(user)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error(error)
  }
}

// sign out in app with Google
export const signOutWithGooglePopup = async (
  setUserData: Dispatch<SetStateAction<User | null>>
) => {
  const auth = getAuth()
  try {
    await signOut(auth)
    setUserData(null)
    localStorage.removeItem('user')
  } catch (error) {
    console.log(error)
  }
}
