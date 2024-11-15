import React from 'react';
import { TodoList, TodoForm } from '../components/TodoComponents';
import { ITodo } from '../api/@types/todo';

const TodoClientView: React.FC = () => {
    return (
        <div>
            <TodoForm
                onAddTodo={function (text: string): void {
                    throw new Error('Function not implemented.');
                }}
            />
            <TodoList
                todos={[]}
                updateTodo={function (id: number, _updatedFields: Partial<ITodo>): void {
                    throw new Error('Function not implemented.');
                }}
                deleteTodo={function (id: number): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    );
};

export default TodoClientView;
