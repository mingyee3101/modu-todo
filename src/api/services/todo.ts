import { Database } from '../@types/supabase';
import { supabase } from './supabase';

type Tables = Database['public']['Tables'];
type TodoRow = Tables['todo']['Row'];
type TodoInsert = Tables['todo']['Insert'];
type TodoUpdate = Tables['todo']['Update'];

export type Todo = TodoRow;
export type TodoPartial = TodoUpdate;

/**
 * Returns data from a Supabase query or null if there's an error
 */
const handleResponse = <T>(data: T | null, error: any): T | null => {
    if (error) {
        console.error('Error:', error.message);
        return null;
    }
    console.log('Success:', data);
    return data;
};

export const todoService = {
    async getList(): Promise<TodoRow[] | null> {
        const { data, error } = await supabase.from('todo').select('*').order('createdAt', { ascending: false });

        return handleResponse(data, error);
    },

    async create(title: string): Promise<TodoRow | null> {
        const newTodo: TodoInsert = {
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        const { data, error } = await supabase.from('todo').insert(newTodo).select().single();

        return handleResponse(data, error);
    },

    async update(id: string, updatedFields: Pick<TodoUpdate, 'title' | 'completed'>): Promise<TodoRow | null> {
        const updateData: TodoUpdate = {
            ...updatedFields,
            updatedAt: new Date().toISOString(),
        };

        const { data, error } = await supabase.from('todo').update(updateData).eq('id', id).select().single();

        return handleResponse(data, error);
    },

    async delete(id: string): Promise<string | null> {
        const { error } = await supabase.from('todo').delete().eq('id', id);

        return handleResponse(error ? null : id, error);
    },
};
