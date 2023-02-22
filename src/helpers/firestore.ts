import { getAuth, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import { addDoc, collection, doc, DocumentSnapshot, getDoc, setDoc } from '@firebase/firestore'
import {
  columnInterface,
  sessionInterface,
  sessionsInterface,
  tableInterface,
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
  return `/organization/${ownerId}&${orgId}`
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
      if (!isValid) {
        await createOrganization(userData, nameOfOrganization, passwordOfOrganization, router)
      }
      if (isValid) {
        const resultData: sessionsInterface = {
          sessions: [...preparedData.sessions, resultObject],
        }
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
    return resultObject
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

// get tables
export const getSession = async (
  setTables: Dispatch<SetStateAction<sessionInterface | null>>,
  userID: string
) => {
  const localData = localStorage.getItem('organization')
  const firestoreData = (await getDocInFirestore(
    'sessions',
    userID
  )) as DocumentSnapshot<sessionsInterface>
  const preparedFirestoreData = firestoreData.data()

  if (localData && preparedFirestoreData) {
    const preparedLocalData = JSON.parse(localData) as sessionInterface
    const result = preparedFirestoreData.sessions.find((item) => item.id === preparedLocalData.id)

    if (!result) {
      setTables(null)
      return null
    }
    const resultWithUser = result.users.find((item) => item.uid === userID)

    if (!resultWithUser) {
      setTables(null)
      return null
    }

    setTables(result)
    return result
  }

  setTables(null)
  return null
}

// add table
export const addTable = async (currentSession: sessionInterface) => {
  const doc = await getDocInFirestore('sessions', currentSession.owner)
  let preparedDoc = doc.data() as sessionsInterface

  const table: tableInterface = {
    id: getRandomId(),
    title: 'Новая таблица',
    isVisible: true,
    columns: [],
    blocks: [],
  }

  preparedDoc.sessions
    .find((session) => session.id === currentSession.id)
    ?.tables.find((item) => item.id === table.id) && (await addTable(currentSession))
  preparedDoc.sessions.find((session) => session.id === currentSession.id)?.tables.push(table)
  await setItemInFirestore('sessions', currentSession.owner, preparedDoc)
}

// add column
export const addColumn = async (currentSession: sessionInterface, indexOfTable: number) => {
  const doc = await getDocInFirestore('sessions', currentSession.owner)
  let preparedDoc = doc.data() as sessionsInterface

  const column: columnInterface = {
    id: getRandomId(),
    title: 'Новая колонка',
  }

  preparedDoc.sessions
    .find((session) => session.id === currentSession.id)
    ?.tables[indexOfTable].columns?.find((item) => item.id === column.id) &&
    (await addColumn(currentSession, indexOfTable))
  preparedDoc.sessions
    .find((session) => session.id === currentSession.id)
    ?.tables[indexOfTable].columns?.push(column)
}

// todo: add block
