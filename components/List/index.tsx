"use client"

import { useState, useEffect } from "react"
import { TList, TListEdit } from "@/lib/types"

export default function List(props: Readonly<{
  tasks: TList[],
  removeTask: (id: number) => void,
  finishTask: (id: number, data: TList) => void,
  setEdit: (data: TListEdit) => void
}>) {
  const { tasks, removeTask, finishTask, setEdit } = props
  const [taskList, setTaskList] = useState<TList[]>(tasks ?? [])

  const handleEdit = (id: number, data: TList) => {
    setEdit({
      isEditing: true,
      id,
      data
    })
  }

  const handleDelete = (id: number) => {
    removeTask(id)
  }

  const handleComplete = (id: number, data: TList) => {
    finishTask(id, {
      ...data,
      completed: !data.completed,
      completed_date: data.completed ? null : new Date().toLocaleString().split(",")[0]
    })
  }

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  return (
    <div>
      {taskList?.map((task) => (
        <div key={task.id} className={`border border-gray rounded my-5 p-5 ${task.completed ? "bg-[#b8c2b9] text-[#382b26]" : "bg-[#382b26] text-[#b8c2b9]"}`}>
          <p><span className="font-bold">Name:</span> {task.name}</p>
          <p><span className="font-bold">Description:</span> {task.description}</p>
          <p><span className="font-bold">Completed:</span> {task.completed?.toString()}</p>
          <p><span className="font-bold">Completed Date:</span> {task.completed_date}</p>
          <p><span className="font-bold">Due Date:</span> {task.due_date}</p>
          <div className="flex flex-row gap-2">
            <button className="border border-gray p-2 rounded bg-[#b8c2b9] text-[#382b26] cursor-pointer" onClick={() => handleEdit(task.id ?? 0, task)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            <button className="border border-gray p-2 rounded bg-[#b8c2b9] text-[#382b26] cursor-pointer" onClick={() => handleDelete(task.id ?? 0)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            {task.completed ?
              <button className="border border-gray p-2 rounded bg-[#b8c2b9] text-[#382b26] cursor-pointer" onClick={() => handleComplete(task.id ?? 0, task)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </button> :
              <button className="border border-gray p-2 rounded bg-[#b8c2b9] text-[#382b26] cursor-pointer" onClick={() => handleComplete(task.id ?? 0, task)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
