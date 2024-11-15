import React, { useState } from 'react';
import TodoClientView from './views/TodoClientView';

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Todos</h1>
            <TodoClientView />
        </div>
    );
};

export default App;
