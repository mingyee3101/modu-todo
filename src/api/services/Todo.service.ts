import { supabase } from './supabase';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

export const TodoService = {
    getList: async () => {
        const { data, error } = await supabase.from('todo').select('*').order('createdAt', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    create: async (title: string) => {
        const { data, error } = await supabase.from('todo').insert([{ title }]);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    update: async (id: string, updatedFields: { title?: string; completed?: boolean }) => {
        const { data, error } = await supabase.from('todo').update(updatedFields).eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    delete: async (id: string) => {
        const { data, error } = await supabase.from('todo').delete().eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
};
