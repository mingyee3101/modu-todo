import { supabase } from './supabase';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

const handleResponse = async (promise: Promise<any>) => {
    const { data, error } = await promise;
    if (error) {
        console.error('Error:', error.message);
        return null;
    }
    console.log('Success:', data);
    return data;
};

export const getTodoList = async (): Promise<Todo[] | null> => {
    return handleResponse(supabase.from('todo').select('*'));
};

export const createTodoList = async (title: string): Promise<Todo | null> => {
    return handleResponse(
        supabase.from('todo').insert([{ title, completed: false, createdAt: new Date().toISOString() }])
    );
};

export const updateTodoList = async (
    id: number,
    updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>
): Promise<Todo | null> => {
    return handleResponse(supabase.from('todo').update(updatedFields).eq('id', id));
};

export const deleteTodoList = async (id: number): Promise<number | null> => {
    const result = await handleResponse(supabase.from('todo').delete().eq('id', id));
    return result ? id : null;
};
