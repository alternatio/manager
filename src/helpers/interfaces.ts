export interface userInterface {
  uid: string,
  name: string | null,
  email: string | null,
  avatar: string | null
}

interface sessionInterface {
  id: string
  title: string
  password: string
}

export interface sessionsInterface {
  owner: string
  sessions: sessionInterface[]
}