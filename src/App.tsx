import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodosContextProvder } from './contexts/TodosContext';

function App() {
  return (
    <>
      <TodosContextProvder>
        <TodoForm/>
        <TodoList/>
      </TodosContextProvder>
    </>
  );
}

export default App;
