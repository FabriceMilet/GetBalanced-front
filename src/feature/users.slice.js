import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// création de la fonction qui post les données du nouvel utilisateur
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
// voir ici avec le back quelle api appeler
      const response = await axios.post("http://localhost:3001/user", userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// création du slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    isLogged: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.isLogged = true;
    })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;