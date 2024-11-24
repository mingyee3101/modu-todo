import { supabase } from './supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Todo 데이터 타입 정의
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

// 할 일 목록 가져오기
const fetchTodos = async (): Promise<Todo[]> => {
    const { data, error } = await supabase.from('todo').select('*');
    if (error) throw new Error(error.message);
    return data as Todo[];
};

// 할 일 추가하기
const addTodo = async (title: string): Promise<Todo> => {
    const { data, error } = await supabase
        .from('todo')
        .insert([{ title, completed: false, createdAt: new Date().toISOString() }]);
    if (error) throw new Error(error.message);
    return data[0] as Todo;
};

// 할 일 업데이트하기
const updateTodo = async (id: number, updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> => {
    const { data, error } = await supabase.from('todo').update(updatedFields).eq('id', id);
    if (error) throw new Error(error.message);
    return data[0] as Todo;
};

// 할 일 삭제하기
const deleteTodo = async (id: number): Promise<number> => {
    const { data, error } = await supabase.from('todo').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return id;
};

// React Query 커스텀 훅
export const useTodos = () => useQuery(['todos'], fetchTodos);
export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(addTodo, { onSuccess: () => queryClient.invalidateQueries(['todos']) });
};
export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, updatedFields }: { id: number; updatedFields: Partial<Pick<Todo, 'title' | 'completed'>> }) =>
            updateTodo(id, updatedFields),
        { onSuccess: () => queryClient.invalidateQueries(['todos']) }
    );
};
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTodo, { onSuccess: () => queryClient.invalidateQueries(['todos']) });
};
