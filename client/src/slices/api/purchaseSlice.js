import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const purchasePost = createAsyncThunk(
  "api/purchasePost",
  async (purchaseData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/purchase/form", purchaseData);
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

export const fetchPurchase = createAsyncThunk(
  "api/fetchPurchase",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/purchases");
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

const purchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    purchases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Post Purchase
      .addCase(purchasePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(purchasePost.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases.push(action.payload);
      })
      .addCase(purchasePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch purchase
      .addCase(fetchPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default purchaseSlice.reducer;
