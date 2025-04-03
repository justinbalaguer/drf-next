export type TList = {
  id?: number
  name: string
  description: string
  completed?: boolean
  completed_date?: string | null
  due_date?: string | null
}

export type TListEdit = {
  isEditing: boolean
  id: number
  data: TList
}

