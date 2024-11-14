import React, { useState } from 'react';
import { supabase } from '../api/services/supabase';

type TodoItemProps = {
  todo: typeof supabase;
  onDelete: (id: number) => void;
  onChange: (id: number, updatedFields: Partial<typeof supabase>) => void; // onChange 추가
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onChange }) => {
  const handleToggle = () => {
    onChange(todo.id, { completed: !todo.completed }); // 상태 변경
  };
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle} // 완료 상태 토글
      />
      {todo.title}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : 'black',
          }}
        >
          {todo.title}
        </span>
      </div>
      {isHovered && (
        <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
          삭제
        </button>
      )}
      
    </li>
  );
};

export default TodoItem;
