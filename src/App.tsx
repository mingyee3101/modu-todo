import React, { useState } from 'react';
import TodoClientView from './views/TodoClientView';
import TodoQueryView from './views/TodoQueryView'; // 쿼리뷰 컴포넌트 추가

const App: React.FC = () => {
    const [isClientView, setIsClientView] = useState(true); // 뷰 전환 상태

    const toggleView = () => {
        setIsClientView((prev) => !prev); // 상태 토글
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Todos</h1>
            <button
                onClick={toggleView}
                style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}
            >
                {isClientView ? 'Switch to Query Page' : 'Switch to Client Page'}
            </button>
            {isClientView ? <TodoClientView /> : <TodoQueryView />}
        </div>
    );
};

export default App;
