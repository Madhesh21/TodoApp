import React, { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

   function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
   }


  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  const handleDeleteTodos = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  const handleEditTodos = (index) => {
    const valueToBeEdited = todos[index]
    setTodos(valueToBeEdited)
    handleDeleteTodos(index)
  }

   useEffect(() => {
    if(!localStorage){
      return 
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return 
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  },[]) 

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList todos={todos} handleDeleteTodos={handleDeleteTodos} handleEditTodos={handleEditTodos}/>
    </>
  )
}
