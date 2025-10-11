import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../api/client';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RoleEnum } from '../pages/register/enum';

export interface User {
  id: number;
  email: string;
  role: RoleEnum;
}

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

// 异步 thunk：登录、注册或获取当前用户
export const fetchCurrentUser = createAsyncThunk<User>(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiClient.get<User>('/auth/me');
      return data; // 返回 user 对象
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      // 登录接口，后端返回 HttpOnly cookie
      const user = await apiClient.post<User>('/auth/login', data);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const registerUser = createAsyncThunk<
  User,
  { email: string; password: string; role: RoleEnum; username: string }
>('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    // 注册接口，后端返回 HttpOnly cookie
    const user = await apiClient.post<User>('/auth/register', data);
    return user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
