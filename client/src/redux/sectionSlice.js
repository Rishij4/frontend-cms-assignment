import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

const initialState = {
  sections: [],
  currentSection: null,
  loading: false,
  error: null,
};

// Fetch All Sections
export const fetchSections = createAsyncThunk(
  "sections/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/sections");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch sections"
      );
    }
  }
);

// Fetch Section By ID
export const fetchSectionById = createAsyncThunk(
  "sections/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/sections/${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch section"
      );
    }
  }
);

// Update Section
export const updateSection = createAsyncThunk(
  "sections/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/sections/${id}`, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update section"
      );
    }
  }
);

// Delete Section
export const deleteSection = createAsyncThunk(
  "sections/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/sections/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete section"
      );
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    clearCurrentSection: (state) => {
      state.currentSection = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ==========================
      // Fetch All Sections
      // ==========================
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })

      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Fetch Section By ID
      // ==========================
      .addCase(fetchSectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSection = action.payload;
      })

      .addCase(fetchSectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Update Section
      // ==========================
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;

        state.sections = state.sections.map((section) =>
          section._id === action.payload._id
            ? action.payload
            : section
        );

        state.currentSection = action.payload;
      })

      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Delete Section
      // ==========================
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;

        state.sections = state.sections.filter(
          (section) => section._id !== action.payload
        );
      })

      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentSection } = sectionSlice.actions;

export default sectionSlice.reducer;