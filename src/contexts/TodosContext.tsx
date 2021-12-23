import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// 두 개의 Context를 만든다. 
// 하나는 상태 전용 Context
// 또 다른 하나는 디스패치 전용 Context
// 이렇게 두 개의 Context 를 만들면 낭비 렌더링을 방지 할 수 있다.


type TodosState = Todo[]

const initialState: TodosState = [
  {
    id: 1,
    text: 'Context API 배우기',
    done: true
  },
  {
    id: 2,
    text: 'TypeScript 배우기',
    done: true
  },
  {
    id: 3,
    text: 'TypeScript 와 Context API 함께 사용하기',
    done: false
  }
]

const TodosStateContext = createContext<TodosState | undefined>(undefined)

type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number }

type TodosDispatch = Dispatch<Action>
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined)

const todosReducer = (state: TodosState, action: Action): TodosState => {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(...state.map(todo => todo.id)) + 1
      return state.concat({
        id: nextId,
        text: action.text,
        done: false
      })
    case 'TOGGLE':
      return state.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id)
    default:
      throw new Error('Unhandled action')
  }
}

export const TodosContextProvder = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState)
  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  )
}

// 유효성 검사생략을 위한 커스텀 Hooks
export const useTodoState = () => {
  const state = useContext(TodosStateContext)
  if (!state) throw new Error('TodosProvider not found')
  return state
}

export const useTodosDispatch = () => {
  const dispatch = useContext(TodosDispatchContext)
  if (!dispatch) throw new Error('TodosProvider not found')
  return dispatch
}