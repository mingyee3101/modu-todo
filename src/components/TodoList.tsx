import { useState } from 'react';
import useTodoState from '../hooks/useTodoState'; // useTodoState Hook 가져오기
import TodoItem from './TodoItem';
import { ITodo } from '../api/@types/todo';

type TodoListProps = {
    todos: ITodo[]; // todos 배열 타입 정의
    updateTodo: (id: number, updatedFields: Partial<ITodo>) => void;
    deleteTodo: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = () => {
    const { todos, addTodo, updateTodo, deleteTodo } = useTodoState();
    const [selectAll, setSelectAll] = useState(false);

    // 전체 선택/해제 기능
    const toggleSelectAll = () => {
        const newSelectAllState = !selectAll;
        setSelectAll(newSelectAllState);

        // 모든 Todo 항목의 completed 상태를 변경
        todos.forEach((todo) => {
            updateTodo(todo.id, { completed: newSelectAllState });
        });
    };

    return (
        <div>
            <button onClick={toggleSelectAll}>{selectAll ? '전체 해제' : '전체 선택'}</button>
            <input
                type="text"
                placeholder="새로운 Todo 입력"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                        addTodo(e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                    }
                }}
            />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
                        />
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'gray' : 'black',
                            }}
                        >
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onChange={updateTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
