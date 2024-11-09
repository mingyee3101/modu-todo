import { useState } from 'react';
import { ITodo } from '../api/services/todo';

const useTodoState = () => {
  const [todos, setTodos] = useState<ITodo[]>([]); // ITodo 타입 적용
  const [nextId, setNextId] = useState(1);

  // Todo 타입 정의
  type Todo = {
    id: number;
    title: string;
    completed: boolean;
  };

  // Create
  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      id: nextId, title, completed: false,
      createdAt: ''
    }; // ITodo 타입 사용
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNextId((prevId) => prevId + 1);
  };

  // Read
  const getTodos = () => todos;

  // Update
  const updateTodo = (id: number, updatedFields: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  // Delete
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, getTodos, updateTodo, deleteTodo };
};

export default useTodoState;
