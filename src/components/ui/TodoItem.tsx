import { useState } from "react";
import { Edit2, Trash, Calendar, Check, X, Save } from "lucide-react";
import { deleteTodo, Todo, updateTodo } from "../../store/slices/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "");

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;

    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dueDate < today;
  };

  const isDueToday = () => {
    if (!todo.dueDate) return false;

    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        completed: !todo.completed,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask(todo.task);
    setEditedDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "");
  };

  const handleSaveEdit = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        task: editedTask,
        dueDate: editedDueDate ? new Date(editedDueDate).toISOString() : undefined,
      })
    );
    setIsEditing(false);
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 transition-all ${
        todo.completed ? "bg-gray-50 border-gray-200" : isOverdue() ? "bg-red-50 border-red-200" : isDueToday() ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${todo.completed ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 bg-white"}`}
              onClick={handleToggleComplete}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed && <Check size={12} />}
            </button>

            <div>
              <p className={`text-base ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>{todo.task}</p>

              {todo.dueDate && (
                <div className="flex items-center mt-1 text-sm">
                  <Calendar size={14} className={`mr-1 ${todo.completed ? "text-gray-400" : isOverdue() ? "text-red-500" : isDueToday() ? "text-blue-500" : "text-gray-500"}`} />
                  <span className={`${todo.completed ? "text-gray-400" : isOverdue() ? "text-red-500" : isDueToday() ? "text-blue-500" : "text-gray-500"}`}>
                    {formatDueDate(todo.dueDate)}
                    {isDueToday() && !todo.completed && " (Today)"}
                    {isOverdue() && !todo.completed && " (Overdue)"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-1">
            <button onClick={handleEdit} className="p-1 text-gray-500 hover:text-blue-600 transition-colors" aria-label="Edit task">
              <Edit2 size={16} />
            </button>

            <button onClick={handleDelete} className="p-1 text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete task">
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
