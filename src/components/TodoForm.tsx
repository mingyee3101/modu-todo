import React, { useState } from 'react';

interface ToDoFormProps {
    onAddTodo: (text: string) => void;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ onAddTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" />
            <button type="submit">Add</button>
        </form>
    );
};

export default ToDoForm;
