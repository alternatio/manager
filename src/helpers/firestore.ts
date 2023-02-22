import { getAuth, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import { addDoc, collection, doc, getDoc, setDoc } from '@firebase/firestore'
import {
  sessionInterface,
  sessionsInterface,
  userInterface,
  userInterfaceWithRole,
} from './interfaces'
import { getRandomId } from './global'
import { NextRouter } from 'next/router'

// get doc in firestore
export const getDocInFirestore = async (collectionName: string, docName: string) => {
  return await getDoc(doc(db, collectionName, docName))
}

// add item in firestore
export const addItemInFirestore = async (collectionName: string, data: object) => {
  await addDoc(collection(db, collectionName), data)
}

// set item in firestore
export const setItemInFirestore = async (collectionName: string, docName: string, data: object) => {
  await setDoc(doc(db, collectionName, docName), data)
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

// get link on session
export const getLink = (ownerId: string, orgId: string) => {
  return `organization/${ownerId}&${orgId}`
}

// create organization
export const createOrganization = async (
  userData: User | null,
  nameOfOrganization: string,
  passwordOfOrganization: string,
  router: NextRouter
) => {
  if (nameOfOrganization && passwordOfOrganization && userData?.uid) {
    const data = await getDocInFirestore('sessions', userData.uid)
    const preparedData = data.data() as sessionsInterface | undefined
    const id = getRandomId(8)
    const link = getLink(userData.uid, id)

    const preparedUser: userInterfaceWithRole = {
      uid: userData.uid,
      name: userData.displayName,
      email: userData.email,
      avatar: userData.photoURL,
      role: 'Owner',
    }

    const resultObject: sessionInterface = {
      id,
      owner: preparedUser.uid,
      title: nameOfOrganization,
      password: passwordOfOrganization,
      users: [preparedUser],
      tables: [],
    }

    if (preparedData) {
      const isValid = preparedData.sessions.find((obj) => obj.id === id) === undefined
      const resultData: sessionsInterface = {
        sessions: [...preparedData.sessions, resultObject],
      }

      if (isValid) {
        await setItemInFirestore('sessions', preparedUser.uid, resultData)
        await router.push(link)
      }
    } else {
      const resultData: sessionsInterface = {
        sessions: [resultObject],
      }
      await setItemInFirestore('sessions', preparedUser.uid, resultData)
      await router.push(link)
    }
  }
}

// get user
export const getUser = (setUserData: Dispatch<SetStateAction<User | null>>) => {
  const data = localStorage.getItem('user')
  if (data) {
    const preparedData = JSON.parse(data) as User
    setUserData(preparedData)
    return preparedData
  }
}
