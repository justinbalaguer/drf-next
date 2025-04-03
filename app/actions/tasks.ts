"use server"

import { TList } from "@/lib/types"

export const getTask = async () => {
  const res = await fetch("https://drf-wnlm.onrender.com/api/task-list/")
  const tasks = await res.json()
  return tasks
}

export const addTask = async (data: TList) => {
  const res = await fetch("https://drf-wnlm.onrender.com/api/task-create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

export const updateTask = async (id: number, data: TList) => {
  const res = await fetch(`https://drf-wnlm.onrender.com/api/task-update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

export const deleteTask = async (id: number) => {
  const res = await fetch(`https://drf-wnlm.onrender.com/api/task-delete/${id}`, {
    method: "DELETE",
  })

  return res.json()
}
