import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../store/slices/todoSlice";
import { clearError } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store";
import { Calendar,Plus } from "lucide-react";

const TodoForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.todo);

  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskError, setTaskError] = useState<string | undefined>(undefined);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!task.trim()) {
      setTaskError("Task is required");
      isValid = false;
    } else {
      setTaskError(undefined);
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await dispatch(
      createTodo({
        task,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      })
    );

    setTask("");
    setDueDate("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 text-red-600 rounded-md">{error}</div>}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Add a new task..."
              name="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${taskError ? "border-red-500" : "border-gray-300"}`}
            />
            {taskError && <p className="mt-1 text-sm text-red-500">{taskError}</p>}
          </div>
        </div>

        <div className="w-full md:w-48">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors"
        >
           <Plus size={18} />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
