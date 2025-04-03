"use client"

import { useState, useEffect } from "react"
import { TList, TListEdit } from "@/lib/types"
import { getTask, addTask, deleteTask, updateTask } from "@/app/actions/tasks"
import { List, Form } from "@/components"

export default function Main() {
  const [tasks, setTasks] = useState<TList[]>([])
  const [edit, setEdit] = useState<TListEdit>({
    isEditing: false,
    id: 0,
    data: {
      name: "",
      description: "",
      completed: false,
      completed_date: null,
      due_date: null
    }
  })

  const fetchTasks = () => {
    getTask().then((res) => {
      setTasks(res)
    })
  }

  const newTask = (data: TList) => {
    addTask(data)
    fetchTasks()
  }

  const removeTask = (id: number) => {
    deleteTask(id)
    fetchTasks()
  }

  const finishTask = (id: number, data: TList) => {
    updateTask(id, data)
    fetchTasks()
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="p-5">
      <Form newTask={newTask} edit={edit} editTask={finishTask} />
      <List tasks={tasks} removeTask={removeTask} finishTask={finishTask} setEdit={setEdit} />
    </div>
  );
}
