import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const salePost = createAsyncThunk(
  "api/salePost",
  async (saleData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/sale/form", saleData);
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

export const fetchSale = createAsyncThunk(
  "api/fetchSale",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/sales");
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

const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Post Sales
      .addCase(salePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(salePost.fulfilled, (state, action) => {
        state.loading = false;
        state.sales.push(action.payload);
      })
      .addCase(salePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch Sale
      .addCase(fetchSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saleSlice.reducer;
