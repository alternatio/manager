export interface userInterface {
  uid: string,
  name: string | null,
  email: string | null,
  avatar: string | null
}

export interface sessionInterface {
  id: string
  owner: string
  title: string
  password: string
  users: userInterface[]
}

export interface sessionsInterface {
  sessions: sessionInterface[]
}