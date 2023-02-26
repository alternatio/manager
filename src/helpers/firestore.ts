import { getAuth, signInWithPopup, signOut, User } from '@firebase/auth'
import { db, provider } from '../../data/firebase/firebase'
import { Dispatch, SetStateAction } from 'react'
import { addDoc, collection, doc, DocumentSnapshot, getDoc, setDoc } from '@firebase/firestore'
import {
  blockInterface,
  columnInterface,
  sessionInterface,
  sessionInterfacePublic,
  sessionsInterface,
  tableInterface,
  userInterface,
  userInterfaceWithRole,
} from './interfaces'
import { getCurrentDate, getRandomColor, getRandomId } from './global'
import { NextRouter } from 'next/router'
import { string } from 'prop-types'

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
export const getLink = (orgId: string) => {
  return `/organization/${orgId}`
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
    const id = `${userData.uid}&${getRandomId(6)}`
    const link = getLink(id)

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
          publicSessions: preparedData.publicSessions || [],
        }
        await setItemInFirestore('sessions', preparedUser.uid, resultData)
        await router.push(link)
      }
    } else {
      const resultData: sessionsInterface = {
        sessions: [resultObject],
        publicSessions: [],
      }
      await setItemInFirestore('sessions', preparedUser.uid, resultData)
      await router.push(link)
    }
    return resultObject
  }
}

// update organization
export const updateOrganization = async (
  userData: User,
  idOfOrganization: string,
  owner: string,
  name: string,
  password: string
) => {
  const doc = (await getDocInFirestore('sessions', owner)) as DocumentSnapshot<sessionsInterface>
  const docPrepared = doc.data()

  if (docPrepared) {
    const sessionIndex = docPrepared.sessions.findIndex(
      (session) => session.id === idOfOrganization
    )

    if (sessionIndex !== -1) {
      docPrepared.sessions[sessionIndex].title = name
      docPrepared.sessions[sessionIndex].password = password

      await setItemInFirestore('sessions', owner, docPrepared)
    }
  }
}

// add organization
export const addOrganization = async (
  userData: User,
  idOfOrganization: string,
  owner: string,
  passwordOfOrganization: string,
  router: NextRouter
) => {
  // owner data
  const ownerDoc = (await getDocInFirestore(
    'sessions',
    owner
  )) as DocumentSnapshot<sessionsInterface>
  const ownerDocPrepared = ownerDoc.data()

  // user data
  const userDoc = (await getDocInFirestore(
    'sessions',
    userData.uid
  )) as DocumentSnapshot<sessionsInterface>
  let userDocPrepared = userDoc.data()

  if (ownerDocPrepared) {
    const valid = ownerDocPrepared.sessions.find(
      (item) => item.id === idOfOrganization && item.password === passwordOfOrganization
    )
    console.log(valid)
    if (valid) {
      // owner ---
      const currentUserObject: userInterfaceWithRole = {
        uid: userData.uid,
        name: userData.displayName,
        email: userData.email,
        avatar: userData.photoURL,
        role: 'User',
      }
      const ownerSessionIndex = getItemIndex(ownerDocPrepared.sessions, idOfOrganization)
      const ownerSessionUsers = ownerDocPrepared.sessions[ownerSessionIndex].users

      const presentUserIndex = ownerSessionUsers.findIndex(
        (user) => user.uid === currentUserObject.uid
      )

      // put new data and save old role
      if (ownerSessionUsers[presentUserIndex] && presentUserIndex !== -1) {
        currentUserObject.role = ownerSessionUsers[presentUserIndex].role
        ownerSessionUsers[presentUserIndex] = currentUserObject
        console.log('present!', currentUserObject)
      } else {
        ownerSessionUsers.push(currentUserObject)
        console.log('not present!', currentUserObject)
      }

      ownerDocPrepared.sessions[ownerSessionIndex].users = ownerSessionUsers

      // user ---
      const userPublicSessions: sessionInterfacePublic = {
        id: ownerDocPrepared.sessions[ownerSessionIndex].id,
        title: ownerDocPrepared.sessions[ownerSessionIndex].title,
        password: passwordOfOrganization,
        owner,
      }

      if (!userDocPrepared) {
        userDocPrepared = {
          sessions: [],
          publicSessions: [],
        }
      }

      if (userDocPrepared.publicSessions.length > 0) {
        const sessionIsPresent = userDocPrepared.publicSessions.findIndex(
          (item) => item.id === userPublicSessions.id
        )
        if (sessionIsPresent !== -1) {
          userDocPrepared.publicSessions[sessionIsPresent] = userPublicSessions
          console.log('old updated')
        } else {
          userDocPrepared.publicSessions = [...userDocPrepared.publicSessions, userPublicSessions]
          console.log('updated')
        }
      } else {
        userDocPrepared.publicSessions = [userPublicSessions]
        console.log('new created')
      }

      // final ---
      await setItemInFirestore('sessions', owner, ownerDocPrepared)
      await setItemInFirestore('sessions', currentUserObject.uid, userDocPrepared)
      // localStorage.setItem('organization', JSON.stringify(ownerDocPrepared))
      await router.push(`/myOrganizations`)
      console.log(ownerDocPrepared, userDocPrepared)
      console.log('valid')
    } else {
      console.log('invalid')
    }
  }
}

// delete organization
export const deleteOrganization = async (
  userData: User,
  idOfOrganization: string,
  owner: string
) => {
  const doc = (await getDocInFirestore('sessions', owner)) as DocumentSnapshot<sessionsInterface>
  const preparedDoc = doc.data()

  if (preparedDoc) {
    const sessionIndex = preparedDoc.sessions.findIndex(
      (session) => session.id === idOfOrganization
    )

    if (sessionIndex !== -1) {
      preparedDoc.sessions.splice(sessionIndex, 1)
      await setItemInFirestore('sessions', owner, preparedDoc)
    }
  }
}

// delete organization in public
export const deleteOrganizationInPublic = async (
  userData: User,
  idOfOrganization: string,
  owner: string
) => {
  // owner data
  const ownerDoc = (await getDocInFirestore(
    'sessions',
    owner
  )) as DocumentSnapshot<sessionsInterface>
  const ownerDocPrepared = ownerDoc.data()

  // user data
  const userDoc = (await getDocInFirestore(
    'sessions',
    userData.uid
  )) as DocumentSnapshot<sessionsInterface>
  let userDocPrepared = userDoc.data()

  if (ownerDocPrepared && userDocPrepared) {
    const userSessionIndex = userDocPrepared.publicSessions.findIndex(
      (item) => item.id === idOfOrganization
    )
    const ownerSessionIndex = ownerDocPrepared.sessions.findIndex(
      (item) => item.id === idOfOrganization
    )

    if (userSessionIndex !== -1 && ownerSessionIndex !== -1) {
      userDocPrepared.publicSessions.splice(userSessionIndex, 1)
      const ownerSession = ownerDocPrepared.sessions[ownerSessionIndex]
      if (ownerSession) {
        const ownerSessionCurrentUserIndex = ownerSession.users.findIndex(
          (user) => user.uid === userData.uid
        )
        if (ownerSessionCurrentUserIndex !== -1) {
          ownerSession.users.splice(ownerSessionCurrentUserIndex, 1)
          ownerDocPrepared.sessions[ownerSessionIndex].users = ownerSession.users

          // final ---
          console.log(userDocPrepared, ownerDocPrepared)
          await setItemInFirestore('sessions', owner, ownerDocPrepared)
          await setItemInFirestore('sessions', userData.uid, userDocPrepared)
        }
      }
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

// get tables
export const getSession = async (setTables: Dispatch<SetStateAction<sessionInterface | null>>) => {
  const localData = localStorage.getItem('organization')
  const userData = localStorage.getItem('user')

  if (localData && userData) {
    const preparedLocalData = JSON.parse(localData) as sessionInterface
    const preparedUserData = JSON.parse(userData) as User

    const firestoreData = (await getDocInFirestore(
      'sessions',
      preparedLocalData.owner
    )) as DocumentSnapshot<sessionsInterface>
    const preparedFirestoreData = firestoreData.data()

    if (preparedFirestoreData) {
      const result = preparedFirestoreData.sessions.find((item) => item.id === preparedLocalData.id)

      console.log(result, preparedFirestoreData)
      if (!result) {
        setTables(null)
        return null
      }
      const resultWithUser = result.users.find((item) => item.uid === preparedUserData.uid)

      if (!resultWithUser) {
        setTables(null)
        return null
      }

      setTables(result)
      return result
    }
  }

  setTables(null)
  return null
}

// get doc index in session
const getItemIndex = (object: { id: string }[], objectID: string) => {
  return object.findIndex((item) => item.id === objectID)
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

  if (
    preparedDoc.sessions
      .find((session) => session.id === currentSession.id)
      ?.tables.find((item) => item.id === table.id)
  ) {
    await addTable(currentSession)
    return
  }
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

  if (
    preparedDoc.sessions
      .find((session) => session.id === currentSession.id)
      ?.tables[indexOfTable].columns?.find((item) => item.id === column.id)
  ) {
    await addColumn(currentSession, indexOfTable)
    return
  }
  preparedDoc.sessions
    .find((session) => session.id === currentSession.id)
    ?.tables[indexOfTable].columns?.push(column)
  await setItemInFirestore('sessions', currentSession.owner, preparedDoc)
}

// add block
export const addBlock = async (
  currentSession: sessionInterface,
  indexOfTable: number,
  currentColumnID: string
) => {
  const doc = await getDocInFirestore('sessions', currentSession.owner)
  let prepareDoc = doc.data() as sessionsInterface

  const sessions = prepareDoc.sessions
  const sessionIndex = getItemIndex(sessions, currentSession.id)

  const block: blockInterface = {
    id: getRandomId(),
    title: 'Новый блок',
    task: 'Задача',
    dateToComplete: getCurrentDate(),
    columnId: currentColumnID,
    status: 'start',
    steps: [],
    isRequired: false,
    isUrgent: false,
    color: getRandomColor(),
  }

  if (sessions[sessionIndex].tables[indexOfTable].blocks?.find((item) => item.id === block.id)) {
    await addBlock(currentSession, indexOfTable, currentColumnID)
    return
  }

  prepareDoc.sessions[sessionIndex].tables[indexOfTable].blocks?.push(block)
  await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
}

const initializeData = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfColumn?: string,
  idOfBlock?: string
) => {
  const doc = (await getDocInFirestore(
    'sessions',
    currentSession.owner
  )) as DocumentSnapshot<sessionsInterface>
  const prepareDoc = doc.data() as sessionsInterface

  const sessions = prepareDoc.sessions
  const sessionIndex = getItemIndex(sessions, currentSession.id)

  const tables = prepareDoc.sessions[sessionIndex].tables
  const tableIndex = getItemIndex(tables, idOfTable)

  const columns = prepareDoc.sessions[sessionIndex].tables[tableIndex].columns
  let columnIndex: number | null = null
  if (columns && idOfColumn) {
    columnIndex = getItemIndex(columns, idOfColumn)
  }

  const blocks = prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks
  let blockIndex: number | null = null
  if (blocks && idOfBlock) {
    blockIndex = getItemIndex(blocks, idOfBlock)
  }

  return {
    doc,
    prepareDoc,
    sessions,
    sessionIndex,
    tables,
    tableIndex,
    columns,
    columnIndex,
    blocks,
    blockIndex,
  }
}

// update table
export const updateTable = async (
  currentSession: sessionInterface,
  idOfTable: string,
  newTable: tableInterface
) => {
  const { prepareDoc, sessionIndex, tableIndex } = await initializeData(currentSession, idOfTable)

  prepareDoc.sessions[sessionIndex].tables[tableIndex] = newTable
  await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
}

// delete table
export const deleteTable = async (currentSession: sessionInterface, idOfTable: string) => {
  const { prepareDoc, sessionIndex, tableIndex } = await initializeData(currentSession, idOfTable)

  prepareDoc.sessions[sessionIndex].tables.splice(tableIndex, 1)
  await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
}

// update column
export const updateColumn = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfColumn: string,
  newColumn: columnInterface
) => {
  const { prepareDoc, sessionIndex, tableIndex, columns, columnIndex } = await initializeData(
    currentSession,
    idOfTable,
    idOfColumn
  )

  if (columns && columnIndex !== null) {
    const preparedColumns = prepareDoc.sessions[sessionIndex].tables[tableIndex].columns
    if (preparedColumns) {
      preparedColumns[columnIndex] = newColumn
      prepareDoc.sessions[sessionIndex].tables[tableIndex].columns = preparedColumns

      await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
    }
  }
}

// delete column
export const deleteColumn = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfColumn: string
) => {
  const { prepareDoc, sessionIndex, tableIndex, columnIndex } = await initializeData(
    currentSession,
    idOfTable,
    idOfColumn
  )

  if (columnIndex !== null) {
    prepareDoc.sessions[sessionIndex].tables[tableIndex].columns?.splice(columnIndex, 1)
    await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
  }
}

// delete block
export const deleteBlock = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfBlock: string
) => {
  const { prepareDoc, sessionIndex, tableIndex, blockIndex } = await initializeData(
    currentSession,
    idOfTable,
    undefined,
    idOfBlock
  )

  if (blockIndex !== null) {
    prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks?.splice(blockIndex, 1)
    await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
  }
}

// update block
export const updateBlock = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfBlock: string,
  newBlock: blockInterface
) => {
  const { prepareDoc, sessionIndex, tableIndex, blocks, blockIndex } = await initializeData(
    currentSession,
    idOfTable,
    undefined,
    idOfBlock
  )

  if (blocks && blockIndex !== null) {
    const preparedBlocks = prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks
    if (preparedBlocks) {
      preparedBlocks[blockIndex] = newBlock
      prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks = preparedBlocks

      await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
    }
  }
}

// swap status of block
export const swapColumnID = async (
  currentSession: sessionInterface,
  idOfTable: string,
  idOfColumn: string,
  idOfBlock: string,
  direction: 'left' | 'right'
) => {
  const { prepareDoc, sessionIndex, tableIndex, columns, columnIndex, blocks, blockIndex } =
    await initializeData(currentSession, idOfTable, idOfColumn, idOfBlock)

  if (blocks !== null && blockIndex !== null && columns !== null && columnIndex !== null) {
    if (direction === 'left') {
      blocks[blockIndex].columnId = columns[columnIndex - 1].id
      prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks = blocks
      await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
    } else if (direction === 'right') {
      blocks[blockIndex].columnId = columns[columnIndex + 1].id
      prepareDoc.sessions[sessionIndex].tables[tableIndex].blocks = blocks
      await setItemInFirestore('sessions', currentSession.owner, prepareDoc)
    }
  }
}
