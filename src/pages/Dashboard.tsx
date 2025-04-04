import { CalendarClock, CheckCircle, Clock, ListTodo } from "lucide-react";
import Header from "../components/ui/Header";
import StatCard from "../components/ui/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchTodos, filterTodos } from "../store/slices/todoSlice";
import TodoForm from "../components/ui/TodoForm";
import TodoFilter from "../components/ui/TodoFilter";
import TodoList from "../components/ui/TodoList";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, filteredTodos, sortBy } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, sortBy]);

  useEffect(() => {
    dispatch(filterTodos());
  }, [dispatch, todos]);

  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const todayTasks = filteredTodos.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tasks and stay organized</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Tasks" value={totalTasks} icon={<ListTodo size={18} />} />
            <StatCard
              title="Completed Tasks"
              value={completedTasks}
              icon={<CheckCircle size={18} />}
              description={totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}% completion rate` : "0% completion rate"}
            />
            <StatCard title="Today's Tasks" value={todayTasks} icon={<CalendarClock size={18} />} description={`${todayTasks} task${todayTasks !== 1 ? "s" : ""} due today`} />
          </div>

          {/* Today's Tasks Section */}
          {todayTasks > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-600 mr-2" size={20} />
                <h2 className="text-xl font-semibold">Today's Tasks</h2>
              </div>
              <div className="space-y-2">
                {filteredTodos.map((todo) => (
                  <div key={todo.id} className="flex items-center p-3 bg-blue-50 rounded-md">
                    <div className={`w-3 h-3 rounded-full mr-3 ${todo.completed ? "bg-green-500" : "bg-blue-500"}`}></div>
                    <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>{todo.task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Task Management</h2>
              <p className="text-gray-600 mt-1">Add, edit, and manage your tasks</p>
            </div>
            <div className="p-6">
              <TodoForm />
              <div className="mt-6">
                <TodoFilter />
              <TodoList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
