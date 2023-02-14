import { getAuth, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  setDoc,
} from '@firebase/firestore'
import { sessionInterface, sessionsInterface, userInterface } from './interfaces'
import { getRandomId } from './global'

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
    await setItemInFirestore('users', user.uid, userObject)
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

export const addSession = async (
  owner: string,
  title: string,
  password: string,
  currentUser: userInterface
) => {
  // get doc
  const doc = (await getDocInFirestore('sessions', owner)) as DocumentSnapshot<sessionsInterface>

  // prepare data
  const docData = doc.data()

  // valid input data
  const validation = (obj: sessionInterface) => {
    return obj.title === title && obj.password === password
  }
  const foundedObject = docData?.sessions.find((obj) => validation(obj))

  // check valid and prepare object and push in firestore
  if (docData?.sessions && foundedObject) {
    const sessionData: sessionInterface = {
      id: foundedObject.id,
      users: [...foundedObject.users, currentUser],
      owner,
      title,
      password,
    }
    const resultData = [...docData.sessions, sessionData]
    console.log({ sessions: resultData })

    //  TODO: do setter in firestore
  }
}

export const createSession = (owner: string, name: string, password: string) => {
  const sessionData = {
    owner,
    name,
    password,
  }
}
