import { supabase } from './supabase';
import { useQuery, useMutation, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

// Todo 데이터 타입 정의
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

// API 에러 타입 정의
export interface ApiError {
    message: string;
    status?: number;
}

// API 함수들
const api = {
    // 할 일 목록 가져오기
    async fetchTodos(): Promise<Todo[]> {
        const { data, error } = await supabase.from('todo').select('*').order('createdAt', { ascending: false });

        if (error) throw { message: error.message, status: error.code };
        return data || [];
    },

    // 할 일 추가하기
    async addTodo(title: string): Promise<Todo> {
        const { data, error } = await supabase
            .from('todo')
            .insert([
                {
                    title,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (error) throw { message: error.message, status: error.code };
        if (!data) throw { message: 'Failed to create todo', status: 500 };
        return data;
    },

    // 할 일 업데이트하기
    async updateTodo(id: string, updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> {
        const { data, error } = await supabase
            .from('todo')
            .update({ ...updatedFields, updatedAt: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw { message: error.message, status: error.code };
        if (!data) throw { message: 'Todo not found', status: 404 };
        return data;
    },

    // 할 일 삭제하기
    async deleteTodo(id: string): Promise<string> {
        const { error } = await supabase.from('todo').delete().eq('id', id);

        if (error) throw { message: error.message, status: error.code };
        return id;
    },
};

// 커스텀 훅들
export const useTodos = (options?: UseQueryOptions<Todo[], ApiError>) => {
    return useQuery<Todo[], ApiError>({
        queryKey: ['todos'],
        queryFn: () => api.fetchTodos(),
        staleTime: 1000 * 60 * 5, // 5분
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const useAddTodo = (options?: UseMutationOptions<Todo, ApiError, string>) => {
    const queryClient = useQueryClient();

    return useMutation<Todo, ApiError, string>({
        mutationFn: (title) => api.addTodo(title),
        onSuccess: (newTodo) => {
            queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => {
                return [newTodo, ...oldTodos];
            });
        },
        onError: (error) => {
            console.error('Failed to add todo:', error.message);
        },
        ...options,
    });
};

export type UpdateTodoParams = {
    id: string;
    updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>;
};

export const useUpdateTodo = (options?: UseMutationOptions<Todo, ApiError, UpdateTodoParams>) => {
    const queryClient = useQueryClient();

    return useMutation<Todo, ApiError, UpdateTodoParams>({
        mutationFn: ({ id, updatedFields }) => api.updateTodo(id, updatedFields),
        onSuccess: (updatedTodo) => {
            queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => {
                return oldTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
            });
        },
        onError: (error) => {
            console.error('Failed to update todo:', error.message);
        },
        ...options,
    });
};

export const useDeleteTodo = (options?: UseMutationOptions<string, ApiError, string>) => {
    const queryClient = useQueryClient();

    return useMutation<string, ApiError, string>({
        mutationFn: (id) => api.deleteTodo(id),
        onSuccess: (deletedId) => {
            queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => {
                return oldTodos.filter((todo) => todo.id !== deletedId);
            });
        },
        onError: (error) => {
            console.error('Failed to delete todo:', error.message);
        },
        ...options,
    });
};
