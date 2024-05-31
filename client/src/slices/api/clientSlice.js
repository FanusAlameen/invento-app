import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const clientPost = createAsyncThunk(
  "api/clientPost",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/clients/form", clientData);
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

export const fetchClients = createAsyncThunk(
  "api/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/clients");
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

export const clientUpdate = createAsyncThunk(
  "api/clientUpdate",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/clients/update", clientData);
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

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //post client
      .addCase(clientPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(clientPost.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(clientPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch client
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //clients update
      .addCase(clientUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clientUpdate.fulfilled, (state, action) => {
        state.loading = false;
        fetchClients();
      })
      .addCase(clientUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
