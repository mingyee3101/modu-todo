import React from 'react';
import { ITodo } from '../api/@types/todo';

type TodoListProps = {
    todos: ITodo[];
    updateTodo: (id: number, updatedFields: Partial<ITodo>) => void;
    deleteTodo: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo, deleteTodo }) => {
    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <span
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                        }}
                    >
                        {todo.title}
                    </span>
                    <button onClick={() => updateTodo(todo.id, { completed: !todo.completed })}>
                        {todo.completed ? '취소' : '완료'}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
