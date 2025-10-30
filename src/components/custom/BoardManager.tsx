import React, { useState } from 'react';
import BoardForm from '@/components/custom/BoardForm'
import BoardItem from '@/components/custom/BoardItem'
import { Board, Todo } from '@/types/models';
import TodoManager from './TodoManager';
import clsx from 'clsx';
interface BoardManagerProps{
  boardIndex: number;
  boardsList: Board[]; // list of all boards
  todosList: Todo[] // list of the todos of this particular board
  boardTitle?: string;
  boardId?:string;
}

const BoardManager = 
({
  boardId,
  boardIndex,
  boardsList,
  todosList,
  boardTitle
}:BoardManagerProps) => {
    const [editingBoard, setEditingBoard] = useState<true|false>(false)
    
    const TodoList =()=> (
         <div className="flex flex-col space-y-2">
       {
        todosList.map((todo:Todo,index:number)=>(
          (

            <TodoManager
            boardId={boardId??""}
            boardIndex={boardIndex}
            boardList={boardsList}
            todoIndex={index}
            todosList={todosList}
            todoDescription={todo.description??""}
            todoId={todo.id}
            todoTitle={todo.title}
            xpReward={todo.xpReward}
            />
          )
        ))
       }
      </div>
    )
  const boardStyles =clsx(
        "w-[320px] p-4 rounded-xl shadow-lg  min-h-[150px] flex-wrap",
        "bg-gray-50 dark:bg-gray-900 text-black dark:text-white",
        "flex flex-col space-y-3"
      )
  return (
    <>
    {
        editingBoard?
        <BoardForm
        boardIndex={boardIndex}
        onCancel={()=>setEditingBoard(false)}
        boardsList={boardsList}
        TodoList={TodoList}
        boardTitle={boardTitle}
        boardId={boardId}
        boardStyles={boardStyles}
        /> :
        <BoardItem
        boardIndex={boardIndex}
        handleEdit={()=>setEditingBoard(true)}
        boardTitle={boardTitle}
      TodoList={TodoList}
      boardStyles={boardStyles}
        />
    }
    </>
  )
}

export default BoardManager