export interface ITodo {
    map(arg0: (todo: { id: any }) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
    completed: boolean;
    createdAt: string;
    id: string;
    title: string;
    updatedAt?: string | null;
}
