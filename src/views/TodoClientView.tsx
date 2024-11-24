import React, { useState } from 'react';
import { TodoList, TodoForm } from '../components/TodoComponents';
import { ITodo } from '../api/@types/todo';

const TodoClientView: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    // 할 일 추가 함수
    const handleAddTodo = (text: string) => {
        const newTodo: ITodo = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1, // ID 생성
            title: text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    // 할 일 업데이트 함수
    const handleUpdateTodo = (id: number, updatedFields: Partial<ITodo>) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo)));
    };

    // 할 일 삭제 함수
    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <TodoForm onAddTodo={handleAddTodo} />
            <TodoList todos={todos} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo} />
        </div>
    );
};

export default TodoClientView;
