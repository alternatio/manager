// kanban block interface
export interface sessionDataBlockI {
  id: string
  title: string
  // status is current column id
  status: string
  color: string
  isRequired: boolean
  isUrgent: boolean
  text: string
  dateToComplete: string
}

// kanban column interface
export interface sessionDataColumnI {
  id: string
  title: string
  blocks?: sessionDataBlockI[]
}

// kanban table interface
export interface sessionDataTableI {
  id: string
  title: string
  columns?: sessionDataColumnI[]
}

// kanban full data interface
export interface sessionsDataI {
  id: string
  title: string
  password: string
  tables?: sessionDataTableI[]
}

// kanban full data
export const sessionsData: sessionsDataI[] = []