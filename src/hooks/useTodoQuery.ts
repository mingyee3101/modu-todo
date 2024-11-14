import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ITodo } from '../api/@types/todo';
import { getTodoList, addTodo, updateTodo, deleteTodo } from '../api/services/Todo.Query.service';

const useTodoQuery = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery('todo', getTodoList);
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries('todo'),
  });
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries('todo'),
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries('todo'),
  });

  return { todosQuery, addTodoMutation, updateTodoMutation, deleteTodoMutation };
};

export default useTodoQuery;
