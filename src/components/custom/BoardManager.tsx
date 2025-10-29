import React, { useState } from 'react';
import BoardForm from '@/components/custom/BoardForm'
import BoardItem from '@/components/custom/BoardItem'

const BoardManager = () => {
    const [editingTodo, seteditingTodo] = useState<true|false>(false)
  return (
    <>
    {
        editingTodo?
        <BoardForm
        
        /> :
        <BoardItem
        
        />
    }
    </>
  )
}

export default BoardManager