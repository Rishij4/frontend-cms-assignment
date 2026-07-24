import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", credentials);

      localStorage.setItem("token", response.data.token);

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );

    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      localStorage.removeItem("token");

      state.admin = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;