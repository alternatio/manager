// kanban block interface
export interface sessionDataBlockILegacy {
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
export interface sessionDataColumnILegacy {
  id: string
  title: string
  blocks?: sessionDataBlockILegacy[]
}

// kanban table interface
export interface sessionDataTableILegacy {
  id: string
  title: string
  columns?: sessionDataColumnILegacy[]
}

// kanban full data interface
export interface sessionsDataILegacy {
  id: string
  title: string
  password: string
  tables?: sessionDataTableILegacy[]
}

// kanban full data
export const sessionsData: sessionsDataILegacy[] = []