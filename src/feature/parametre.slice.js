import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const addPlanner = createAsyncThunk(
  "parametre/addPlanner",
  async (formData, thunkAPI) => {
    try {
      // il va falloir récup l'id mais formData ne le contient pas, à voir ..
      const response = await axios.post(`${apiUrl}/planner/user/58`, formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// création du slice
const parametreSlice = createSlice({
  name: "parametre",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    formData: { title: "", description: "", invitation: "" },
    planners: [],
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlanner.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.planners.push(action.payload);
      })
      .addCase(addPlanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openModal, setFormData } = parametreSlice.actions;
export default parametreSlice.reducer;
