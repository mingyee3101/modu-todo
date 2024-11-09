import React, { useState } from 'react';
import useTodoState from './hooks/useTodoState';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoState();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Todos</h1>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleAddTodo} style={{ marginLeft: '10px', padding: '8px' }}>
          추가
        </button>
      </div>

      {/* TodoList에 todos, updateTodo, deleteTodo 전달 */}
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;