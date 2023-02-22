import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// création du slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    isOpen: false,
    formData: { title: "", description: "" },
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setFormData: (state, action) => {
        state.formData = action.payload;
      },
  },
});

export const { openModal, setFormData } = taskSlice.actions;
export default taskSlice.reducer;