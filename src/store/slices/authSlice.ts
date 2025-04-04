
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isLoading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

// Create async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      toast.success('Registration successful! Please log in.');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`, 
        credentials, 
        { withCredentials: true } 
      );
      
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      toast.success('Login successful!');
      
   
      return { accessToken };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      toast.success('If an account with that email exists, a password reset link has been sent.');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to process request';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
      toast.success('Password has been reset successfully.');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      localStorage.removeItem('accessToken');
      toast.success('Logout successful!');
      return null;
    } catch (error: any) {
      localStorage.removeItem('accessToken');
      return null;
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await axios.put(
        `${API_URL}/users/password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      toast.success('Password changed successfully!');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user profile';
      // If unauthorized, log out
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('accessToken');
      }
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setRefreshedToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // If token is invalid, logout
        if (action.error.message?.includes('401') || action.error.message?.includes('403')) {
          state.user = null;
          state.accessToken = null;
          state.isAuthenticated = false;
        }
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setRefreshedToken  } = authSlice.actions;
export default authSlice.reducer;
