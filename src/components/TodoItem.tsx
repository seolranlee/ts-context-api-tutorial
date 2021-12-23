import React from "react";
import './TodoItem.css'

export interface Props {
  todo: {
    id: number;
    text: string;
    done: boolean;
  }
}

const TodoItem = ({ todo }: Props) => {
  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text">{todo.text}</span>
      <span className="remove">(X)</span>
    </li>
  )
}

export default TodoItem