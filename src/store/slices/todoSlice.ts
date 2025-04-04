import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../util/axios";

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  loading: boolean;
  error: string | null;
  filter: "all" | "completed" | "incomplete" | "today";
  sortBy: string;
}

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
  loading: false,
  error: null,
  filter: "all",
  sortBy: "dueDate:asc",
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { todo: TodoState };
    const sortBy = state.todo.sortBy;
    const response = await api.get(`${API_URL}/todos?sortBy=${sortBy}`);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue("Failed to fetch todos");
    }
  }
});

export const createTodo = createAsyncThunk("todo/createTodo", async ({ task, dueDate }: { task: string; dueDate?: string }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/todos`, { task, dueDate });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue("Failed to create todo");
    }
  }
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async ({ id, task, completed, dueDate }: { id: string; task?: string; completed?: boolean; dueDate?: string }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_URL}/todos/${id}`, { task, completed, dueDate });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue("Failed to update todo");
    }
  }
});

export const deleteTodo = createAsyncThunk(`${API_URL}todo/deleteTodo`, async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/todos/${id}`);
    return id;
  } catch (err: any) {
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue("Failed to delete todo");
    }
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"all" | "completed" | "incomplete" | "today">) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    filterTodos: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      state.filteredTodos = state.todos.filter((todo) => {
        if (!todo.dueDate) return false;

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate.getTime() === today.getTime();
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = payload;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      state.filteredTodos = state.todos.filter((todo) => {
        if (!todo.dueDate) return false;

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate.getTime() === today.getTime();
      });
    });
    builder.addCase(fetchTodos.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      toast.error(payload as string);
    });

    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos.push(payload);
      toast.success("Task created successfully");

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (payload.dueDate) {
        const dueDate = new Date(payload.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate.getTime() === today.getTime()) {
          state.filteredTodos.push(payload);
        }
      }
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      toast.error(payload as string);
    });

    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = state.todos.map((todo) => (todo.id === payload.id ? payload : todo));
      toast.success("Task updated successfully");

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      state.filteredTodos = state.todos.filter((todo) => {
        if (!todo.dueDate) return false;

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate.getTime() === today.getTime();
      });
    });
    builder.addCase(updateTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      toast.error(payload as string);
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      state.filteredTodos = state.filteredTodos.filter((todo) => todo.id !== payload);
      toast.success("Task deleted successfully");
    });
    builder.addCase(deleteTodo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      toast.error(payload as string);
    });
  },
});

export const { setFilter, setSortBy, clearError, filterTodos } = todoSlice.actions;

export default todoSlice.reducer;
