import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../api/client';

export interface Ticket {
  id: number;
  createdAt: string;
  user: string;
  amount: number;
  link?: string;
  description?: string;
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
};

// 获取所有票证
export const fetchTickets = createAsyncThunk<Ticket[]>(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiClient.get<Ticket[]>('/tickets');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 创建票证
export const createTicket = createAsyncThunk<Ticket, Omit<Ticket, 'id'>>(
  'tickets/createTicket',
  async (ticket, { rejectWithValue }) => {
    try {
      const data = await apiClient.post<Ticket>('/tickets', ticket);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
        state.tickets.push(action.payload);
      });
  },
});

export default ticketsSlice.reducer;
