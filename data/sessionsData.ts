// kanban block interface
export interface sessionDataBlockI {
  title: string
  isRequired: boolean
  isUrgent: boolean
  text: string
}

// kanban column interface
export interface sessionDataColumnI {
  title: string
  blocks?: sessionDataBlockI[]
}

// kanban table interface
export interface sessionDataTableI {
  title: string
  columns?: sessionDataColumnI[]
}

// kanban full data interface
export interface sessionsDataI {
  title: string
  blocks?: sessionDataTableI[]
}

// kanban full data
export const sessionsData: sessionsDataI[] = []