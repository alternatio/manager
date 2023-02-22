import { ReactNode } from 'react'

// block
export interface blockInterface {
  id: string
  title: string
  task: string
  steps: string[]
  dateToComplete: string
  color: string

  // statuses
  isRequired: boolean
  isUrgent: boolean
  status: 'start' | 'inProcess' | 'completed'

  // parent id of column
  columnId: string
}

// column
export interface columnInterface {
  id: string
  title: string
}

// table
export interface tableInterface {
  id: string
  title: string
  isVisible: boolean

  columns: columnInterface[] | null
  blocks: blockInterface[] | null
}

//user
export interface userInterface {
  uid: string,
  name: string | null,
  email: string | null,
  avatar: string | null,
}

export interface userInterfaceWithRole extends userInterface {
  uid: string,
  name: string | null,
  email: string | null,
  avatar: string | null,
  role: 'Owner' | 'Admin' | 'User'
}

// session
export interface sessionInterface {
  id: string
  owner: string
  title: string
  password: string
  users: userInterface[]
  tables: tableInterface[]
}

// prepared session
export interface sessionsInterface {
  sessions: sessionInterface[]
}

// hamburger buttons data
export interface hamburgerButtonsDataInterface {
  children: string | ReactNode
  onClick: CallableFunction
  userDataRequired: boolean | null
  redButton?: boolean
}