import React, { useState } from 'react';
import BoardForm from '@/components/custom/BoardForm'
import BoardItem from '@/components/custom/BoardItem'
import { Board } from '@/types/models';

interface BoardManagerProps{
  boardId:string;
  boardPosition: number;
  boards: Board[]
  boardTitle: string;
}

const BoardManager = 
({
  boardId,
  boardPosition,
  boards,
  boardTitle
}:BoardManagerProps) => {
    const [editingBoard, setEditingBoard] = useState<true|false>(false)
    const TodoList =()=> (
         <div className="flex flex-col space-y-2">
        {todos.sort((a,b)=>a.position-b.position).map((todo, index) => (
          <TodoItem
          boardId={boardId}
          todoId={todo.id}
          boardIndex={boardIndex}
            key={todo.id}
            todoIndex={index+1}
            title={todo.title}
            description={todo.description ?? ""}
            completed={todo.completed}
            xpReward={todo.xpReward}
            boards={boards}

          />
        ))}
      </div>
    )
  return (
    <>
    {
        editingBoard?
        <BoardForm
        boardPosition={boardPosition}
        onCancel={()=>setEditingBoard(false)}
        boards={boards}
        todoList=
        /> :
        <BoardItem
        boardPosition={boardPosition}
        handleEdit={()=>setEditingBoard(true)}
        boardTitle={boardTitle}
      TodoList={TodoList}
        boards={boards}
        />
    }
    </>
  )
}

export default BoardManager