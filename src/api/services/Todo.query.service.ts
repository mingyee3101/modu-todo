import { supabase } from './supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 개별 함수들

// 할 일 목록 가져오기 함수
const fetchTodos = async (key: string) => {
    const { data, error } = await supabase.from('todo').select('*');
    if (error) throw new Error(error.message);
    return data;
};

// 할 일 추가하기 함수
const addTodo = async (title: string) => {
    const { data, error } = await supabase.from('todo').insert([
        {
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        },
    ]);
    if (error) throw new Error(error.message);
    return data;
};

// 할 일 업데이트하기 함수
const updateTodo = async (id: number, updatedFields: Partial<{ title: string; completed: boolean }>) => {
    const { data, error } = await supabase.from('todo').update(updatedFields).eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

// 할 일 삭제하기 함수
const deleteTodo = async (id: number) => {
    const { data, error } = await supabase.from('todo').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

// React Query 커스텀 훅들

export const useTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        onError: (error: any) => console.error('할 일 목록 가져오기 에러:', error),
    });
};

// 할 일 추가하기 훅
export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(addTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos']),
        onError: (error: any) => console.error('할 일 추가하기 에러:', error),
    });
};

// 할 일 업데이트하기 훅
export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, updatedFields }: { id: number; updatedFields: Partial<{ title: string; completed: boolean }> }) =>
            updateTodo(id, updatedFields),
        {
            onSuccess: () => queryClient.invalidateQueries(['todos']),
            onError: (error: any) => console.error('할 일 업데이트하기 에러:', error),
        }
    );
};

// 할 일 삭제하기 훅
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos']),
        onError: (error: any) => console.error('할 일 삭제하기 에러:', error),
    });
};
