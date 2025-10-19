import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend base URL
const API_URL = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// ✅ Corrected endpoints
export const fetchCases = createAsyncThunk("cases/fetchAll", async () => {
  const res = await axios.get(`${API_URL}/cases`);
  return res.data;
});

export const fetchCaseById = createAsyncThunk("cases/fetchById", async (id) => {
  const res = await axios.get(`${API_URL}/cases/${id}`);
  return res.data;
});

export const addCase = createAsyncThunk("cases/add", async (newCase) => {
  const res = await axios.post(`${API_URL}/cases`, newCase);
  return res.data;
});

export const updateCase = createAsyncThunk("cases/update", async ({ id, updated }) => {
  const res = await axios.put(`${API_URL}/cases/${id}`, updated);
  return res.data;
});

export const deleteCase = createAsyncThunk("cases/delete", async (id) => {
  await axios.delete(`${API_URL}/cases/${id}`);
  return id;
});



const caseSlice = createSlice({
  name: "cases",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(addCase.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c._id === action.payload._id);
        if (idx >= 0) state.list[idx] = action.payload;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearSelected } = caseSlice.actions;
export default caseSlice.reducer;
