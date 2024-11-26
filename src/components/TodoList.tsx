import React from 'react';
import { Todo } from '../api/services/Todo.service';

type TodoListProps = {
    todos: Todo[];
    updateTodo: (id: string, updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>) => void;
    deleteTodo: (id: string) => void;
    isUpdating?: boolean;
    isDeleting?: boolean;
};

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo, deleteTodo, isUpdating, isDeleting }) => {
    if (!todos?.length) {
        return (
            <ul>
                <li>할 일이 없습니다</li>
            </ul>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                    <button onClick={() => updateTodo(todo.id, { completed: !todo.completed })} disabled={isUpdating}>
                        {todo.completed ? '취소' : '완료'}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} disabled={isDeleting}>
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
