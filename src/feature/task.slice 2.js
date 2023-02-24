import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// création du slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal } = taskSlice.actions;
export default taskSlice.reducer;