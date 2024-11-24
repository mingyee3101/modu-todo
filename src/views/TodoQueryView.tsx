import React, { Profiler } from 'react';
import cn from 'classnames/bind';
import styles from './Todo.view.module.scss'; // 파일 존재 확인 필요
import TodoApp from './components/TodoApp/TodoApp';
import { ITodo } from '../api/@types/todo'; // 경로 확인 필요

const cx = cn.bind(styles);

type TodoViewProps = {
    todos?: ITodo[];
    status?: string;
    type?: 'client' | 'query' | 'server';
};

const TodoQueryView = ({
    todos = [],
    status = 'idle',
    type = 'client',
}: TodoViewProps) => {
    return (
        <Profiler
            id="TodoQueryView"
            onRender={(id, phase, actualDuration) => {
                console.log(`${id} ${phase} took ${actualDuration}ms`);
            }}
        >
            <div className={cx('Wrapper')}>
                <h1 className={cx('TodoTitle')}>
                    Todos <em>{type}</em>
                </h1>
                {todos.length > 0 ? (
                    <ServerTodoApp todos={todos} status={status} />
                ) : type === 'query' ? (
                    <QueryTodoApp status={status} />
                ) : (
                    <TodoApp />
                )}
                <footer className={cx('Footer')}>Created by the Modu2</footer>
            </div>
        </Profiler>
    );
};

export default TodoQueryView;
