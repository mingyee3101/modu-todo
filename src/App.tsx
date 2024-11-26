import React, { useState } from 'react';
import TodoClientView from './views/TodoClientView';
import TodoQueryView from './views/TodoQueryView';
import styles from './App.module.css'; // CSS 모듈로 변경

const App: React.FC = () => {
    const [isClientView, setIsClientView] = useState(true); // 뷰 전환 상태

    const toggleView = () => {
        setIsClientView((prev) => !prev); // 상태 토글
    };

    return (
        <div className={styles.appContainer}>
            <h1 className={styles.title}>Todos</h1>
            <button className={styles.toggleButton} onClick={toggleView}>
                {isClientView ? 'Switch to Query Page' : 'Switch to Client Page'}
            </button>
            <div className={styles.viewContainer}>{isClientView ? <TodoClientView /> : <TodoQueryView />}</div>
        </div>
    );
};

export default App;
