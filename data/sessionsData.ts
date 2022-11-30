// kanban block interface
export interface sessionDataBlock {
  title: string
  isRequired: boolean
  isUrgent: boolean
  text: string
}

// kanban column interface
export interface sessionDataColumn {
  title: string
  blocks?: sessionDataBlock[]
}

// kanban table interface
export interface sessionDataTable {
  title: string
  columns?: sessionDataColumn[]
}

// kanban full data interface
export interface sessionsData {
  title: string
  blocks?: sessionDataTable[]
}

// kanban full data
export const sessionsData: sessionsData[] = []