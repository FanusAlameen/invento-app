import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchDashboardData = createAsyncThunk(
  "api/fetchDashboardData",
  async () => {
    const purchases = await axiosInstance.get("/dashboard/purchase");
    const sales = await axiosInstance.get("/dashboard/sales");
    const purchaseOrders = await axiosInstance.get("/dashboard/purchaseorders");
    const saleOrders = await axiosInstance.get("/dashboard/saleorders");
    const suppliers = await axiosInstance.get("/dashboard/suppliers");
    const clients = await axiosInstance.get("/dashboard/clients");
    const inventory = await axiosInstance.get("/dashboard/inventory");

    return {
      purchases: purchases.data,
      sales: sales.data,
      purchaseOrders: purchaseOrders.data,
      saleOrders: saleOrders.data,
      suppliers: suppliers.data,
      clients: clients.data,
      inventory: inventory.data,
    };
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    data: {},
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
