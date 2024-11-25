import React, { useState } from 'react';
import { ITodo } from '../api/@types/todo';

type TodoItemProps = {
    todo: ITodo;
    updateTodo: (id: string, updatedFields: Partial<Pick<ITodo, 'title' | 'completed'>>) => void;
    deleteTodo: (id: string) => void;
    isUpdating?: boolean;
    isDeleting?: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, updateTodo, deleteTodo, isUpdating, isDeleting }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = () => {
        updateTodo(todo.id, { completed: !todo.completed });
    };

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <div>
                <input type="checkbox" checked={todo.completed} onChange={handleToggle} disabled={isUpdating} />
                <span
                    style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'gray' : 'black',
                        marginLeft: '8px',
                    }}
                >
                    {todo.title}
                </span>
            </div>
            {isHovered && (
                <button onClick={() => deleteTodo(todo.id)} disabled={isDeleting}>
                    삭제
                </button>
            )}
        </li>
    );
};

export default TodoItem;
