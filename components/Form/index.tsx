"use client"

import { useState, useEffect } from "react"
import { TList, TListEdit } from "@/lib/types"

export default function Form(props: Readonly<{
  newTask: (data: TList) => void,
  edit: TListEdit,
  editTask: (id: number, data: TList) => void
}>) {
  const { newTask, edit, editTask } = props
  
  const [tasks, setTasks] = useState<TList>({
    name: "",
    description: "",
    due_date: null,
    completed_date: null,
  })

  const handleSubmit = () => {
    if (edit.isEditing) {
      editTask(edit.id, tasks)
      setTasks({
        name: "",
        description: "",
        due_date: null,
        completed_date: null
      })
      edit.isEditing = false
      return
    }

    newTask(tasks)
    setTasks({
      name: "",
      description: "",
      due_date: null,
      completed_date: null
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (edit.isEditing) {
      setTasks(edit.data)
    }
  }, [edit])

  return (
    <div>
      <h1 className="font-bold text-2xl">Django CRUD</h1>
      <div className="flex flex-col gap-2 w-[20%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input className="border border-gray rounded" type="text" name="name" id="name" onChange={handleInputChange} value={tasks.name} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input className="border border-gray rounded" type="text" name="description" id="description" onChange={handleInputChange} value={tasks.description} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input className="border border-gray rounded" type="date" name="due_date" id="due_date" value={tasks.due_date ?? ""} onChange={handleInputChange} />
        </div>
        <div>
          <button className="bg-[#b8c2b9] text-[#382b26] p-2 rounded cursor-pointer" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}
