import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: new Date(),
  },
  reducers: {
    setDateToMore: (state, action) => {
      state.date = action.payload;
    },
    setDateToLess: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDateToMore, setDateToLess } = dateSlice.actions;
export default dateSlice.reducer;
