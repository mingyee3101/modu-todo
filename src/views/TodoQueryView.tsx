import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoList, TodoForm } from '../components/TodoComponents';
import { TodoPartial, todoService } from '../api/services/todo';

const TodoQueryView: React.FC = () => {
    const queryClient = useQueryClient();

    // Queries
    const {
        data: todos = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: () => todoService.getList(),
    });

    // Add Todo Mutation
    const addMutation = useMutation({
        mutationFn: (title: string) => todoService.create(title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // Update Todo Mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, updatedFields }: { id: string; updatedFields: Pick<TodoPartial, 'title' | 'completed'> }) =>
            todoService.update(id, updatedFields),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // Delete Todo Mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => todoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    const handleUpdateTodo = (id: string, updatedFields: Pick<TodoPartial, 'title' | 'completed'>) => {
        updateMutation.mutate({ id, updatedFields });
    };

    const handleDeleteTodo = (id: string) => {
        deleteMutation.mutate(id);
    };

    return (
        <div>
            <TodoForm onAddTodo={(text) => addMutation.mutate(text)} isLoading={addMutation.isPending} />
            <TodoList
                todos={todos ?? []}
                updateTodo={handleUpdateTodo}
                deleteTodo={handleDeleteTodo}
                isUpdating={updateMutation.isPending}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
};

export default TodoQueryView;
