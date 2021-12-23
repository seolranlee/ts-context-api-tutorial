import React from "react";
import { useTodosDispatch } from "../contexts/TodosContext";
import './TodoItem.css'

export interface Props {
  todo: {
    id: number;
    text: string;
    done: boolean;
  }
}

const TodoItem = ({ todo }: Props) => {
  const dispatch = useTodosDispatch()

  const onToggle = () => {
    dispatch( {
      type: 'TOGGLE',
      id: todo.id
    })
  }

  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id: todo.id
    })
  }

  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text" onClick={onToggle}>{todo.text}</span>
      <span className="remove" onClick={onRemove}>(X)</span>
    </li>
  )
}

export default TodoItem