
import  { useEffect } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTodos } from '../../store/slices/todoSlice';
import TodoItem from './TodoItem';

const TodoList  = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error, sortBy } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, sortBy]);

  if (loading && todos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-800">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-blue-600">You don't have any tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
