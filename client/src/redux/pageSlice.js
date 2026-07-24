import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  pages: [],
  loading: false,
  error: null,
  currentPage: null,
};

export const fetchPages = createAsyncThunk(
  "pages/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/pages");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const fetchPageById = createAsyncThunk(
  "pages/fetchPageById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/pages/id/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch page"
      );
    }
  }
);

export const updatePage = createAsyncThunk(
  "pages/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/pages/${id}`, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const deletePage = createAsyncThunk(
  "pages/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/pages/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
    state.currentPage = action.payload;
})

.addCase(updatePage.fulfilled, (state) => {
    state.loading = false;
})
.addCase(deletePage.fulfilled,(state,action)=>{

state.pages=state.pages.filter(
page=>page._id!==action.payload
)

});
      
  },
});

export default pageSlice.reducer;