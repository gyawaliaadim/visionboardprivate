import React, { useState } from 'react'
import TodoForm from '@/components/custom/TodoForm'
import TodoItem from '@/components/custom/TodoItem'
const TodoManager = () => {
    const [editingTodo, setEditingTodo] = useState<true|false>(false)
  return (
    <>
    {
        editingTodo?
        <TodoForm
        />:
        <TodoItem
        />
    }
    </>
  )
}

export default TodoManager