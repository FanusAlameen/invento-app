import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const productPost = createAsyncThunk(
  "api/productPost",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/products/form", productData);
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

export const fetchProducts = createAsyncThunk(
  "api/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products");
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

export const productUpdate = createAsyncThunk(
  "api/productUpdate",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/products/update", productData);
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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Post Product
      .addCase(productPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productPost.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(productPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //products update
      .addCase(productUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.loading = false;
        fetchProducts();
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
