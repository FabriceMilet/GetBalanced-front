import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    // .getTime() pour régler le new Date () qui pose un problème de "serialization"
    date: new Date().getTime(),
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
