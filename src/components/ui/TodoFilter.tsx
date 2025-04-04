import { ArrowUpDown } from "lucide-react";
import { fetchTodos, setSortBy } from "../../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ChangeEvent } from "react";

const sortOptions = [
  { value: "dueDate:asc", label: "Due Date (Earliest First)" },
  { value: "dueDate:desc", label: "Due Date (Latest First)" },
  { value: "createdAt:desc", label: "Recently Added" },
  { value: "createdAt:asc", label: "Oldest Added" },
];

const TodoFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy } = useSelector((state: RootState) => state.todo);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    dispatch(fetchTodos());
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="relative">
        <select value={sortBy} onChange={handleSortChange} className=" border-1 rounded-sm border-gray-200 appearance-none pr-10 pl-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Sort tasks">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
          <ArrowUpDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
