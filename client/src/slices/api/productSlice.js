import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// Post Product
export const productPost = createAsyncThunk(
  "products/productPost",
  async (productData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.post("/products/form", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

// Fetch Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

// Update Product
export const productUpdate = createAsyncThunk(
  "products/productUpdate",
  async (productData, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.put(
        "/products/update",
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh products after successful update
      dispatch(fetchProducts());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
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
      // POST
      .addCase(productPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productPost.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(productPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
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

      // UPDATE
      .addCase(productUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.loading = false;
        // No need to modify products here, fetchProducts() will update it
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
