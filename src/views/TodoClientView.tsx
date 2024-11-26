import React, { useState } from 'react';
import { TodoList, TodoForm } from '../components/TodoComponents';
import { Todo } from '../api/services/Todo.service';
import styles from './TodoClientView.module.scss';

const TodoClientView: React.FC = () => {
    const local = localStorage.getItem('todos');
    const parsedLocal = local ? JSON.parse(local) : [];
    const [todos, setTodos] = useState<Todo[]>(parsedLocal);

    // 할 일 추가 함수
    const handleAddTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    // 할 일 업데이트 함수
    const handleUpdateTodo = (id: string, updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedFields, updatedAt: new Date().toISOString() } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    // 할 일 삭제 함수
    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <div className={styles.todoapp}>
            <TodoForm onAddTodo={handleAddTodo} isLoading={false} />
            <TodoList
                todos={todos}
                updateTodo={handleUpdateTodo}
                deleteTodo={handleDeleteTodo}
                isUpdating={false}
                isDeleting={false}
            />
        </div>
    );
};

export default TodoClientView;
