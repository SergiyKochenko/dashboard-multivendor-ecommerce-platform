import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const resolveYear = (input) => {
  const fallback = new Date().getFullYear();
  if (input === undefined || input === null) return fallback;
  if (typeof input === 'number') return input;
  if (typeof input === 'object' && 'year' in input) {
    const n = Number.parseInt(input.year, 10);
    return Number.isNaN(n) ? fallback : n;
  }
  const n = Number.parseInt(input, 10);
  return Number.isNaN(n) ? fallback : n;
};

export const get_admin_dashboard_data = createAsyncThunk(
  'dashboard/get_admin_dashboard_data',
  async (year, { rejectWithValue, fulfillWithValue }) => {
    const targetYear = resolveYear(year);
    try {
      const { data } = await api.get(`/admin/get-dashboard-data?year=${targetYear}`, {
        withCredentials: true,
      });
      return fulfillWithValue({ ...data, year: targetYear });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// End method

export const get_seller_dashboard_data = createAsyncThunk(
  'dashboard/get_seller_dashboard_data',
  async (year, { rejectWithValue, fulfillWithValue }) => {
    const targetYear = resolveYear(year);
    try {
      const { data } = await api.get(`/seller/get-dashboard-data?year=${targetYear}`, {
        withCredentials: true,
      });
      return fulfillWithValue({ ...data, year: targetYear });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);
// End method

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrder: [],
    recentMessage: [],
    monthlyOrders: new Array(12).fill(0),
    monthlyRevenue: new Array(12).fill(0),
    monthlySellers: new Array(12).fill(0),
    monthlySales: new Array(12).fill(0),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
        state.monthlyOrders = payload.chart?.orders || state.monthlyOrders;
        state.monthlyRevenue = payload.chart?.revenue || state.monthlyRevenue;
        state.monthlySellers = payload.chart?.sellers || state.monthlySellers;
      })
      .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalPendingOrder = payload.totalPendingOrder;
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
        state.monthlyOrders = payload.chart?.orders || state.monthlyOrders;
        state.monthlyRevenue = payload.chart?.revenue || state.monthlyRevenue;
        state.monthlySales = payload.chart?.sales || state.monthlySales;
      });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
