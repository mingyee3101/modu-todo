import React, { useState } from 'react';

interface TodoFormProps {
    onAddTodo: (text: string) => void;
    isLoading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return; // 빈 입력 방지
        onAddTodo(inputValue);
        setInputValue(''); // 입력값 초기화
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
};

export default TodoForm;
