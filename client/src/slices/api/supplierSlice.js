import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const supplierPost = createAsyncThunk(
  "api/supplierPost",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/suppliers/form",
        supplierData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchSuppliers = createAsyncThunk(
  "api/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/suppliers");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const supplierUpdate = createAsyncThunk(
  "api/supplierUpdate",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/suppliers/update",
        supplierData
      );
      response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Post Supplier
      .addCase(supplierPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(supplierPost.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers.push(action.payload);
      })
      .addCase(supplierPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch Suppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //suppliers update
      .addCase(supplierUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(supplierUpdate.fulfilled, (state, action) => {
        state.loading = false;
        fetchSuppliers();
      })
      .addCase(supplierUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
