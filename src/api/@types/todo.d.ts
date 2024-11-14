export interface ITodo {
    completed: boolean;
    createdAt: string;
    id: number;
    title: string;
    updatedAt?: string | null;
}
