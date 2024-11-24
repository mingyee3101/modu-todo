import { AxiosInstance } from 'axios';
import { pathToUrl } from '../../utils/util';

const TODO_ROUTES = {
    GET_TODO: '/todo',
    GET_TODO_DETAILS: '/todo/:todoId',
    CREATE_TODO: '/todo',
    UPDATE_TODO: '/todo/:todoId',
    DELETE_TODO: '/todo/:todoId',
} as const;

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

export class TodoService {
    constructor(private _ajax: AxiosInstance) {}

    async getTodoList(): Promise<Todo[]> {
        const { data } = await this._ajax.get<Todo[]>(TODO_ROUTES.GET_TODO);
        return data;
    }

    async getTodoDetail(todoId: number): Promise<Todo> {
        const url = pathToUrl(TODO_ROUTES.GET_TODO_DETAILS, { todoId });
        const { data } = await this._ajax.get<Todo>(url);
        return data;
    }

    async createTodoList(title: string): Promise<Todo> {
        const { data } = await this._ajax.post<Todo>(TODO_ROUTES.CREATE_TODO, {
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        });
        return data;
    }

    async updateTodoList(todoId: number, updatedFields: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> {
        const url = pathToUrl(TODO_ROUTES.UPDATE_TODO, { todoId });
        const { data } = await this._ajax.patch<Todo>(url, updatedFields);
        return data;
    }

    async deleteTodoList(todoId: number): Promise<number> {
        const url = pathToUrl(TODO_ROUTES.DELETE_TODO, { todoId });
        await this._ajax.delete(url);
        return todoId;
    }
}
