import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// création de la fonction qui post les données du nouvel utilisateur
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      // voir ici avec le back quelle route appeler
      const response = await axios.post("http://supafei-server.eddi.cloud:8080/user", userData);
      console.log('réponse envoyée en createUser', userData); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      // voir ici avec le back quelle route appeler, celle-ci n'est pas présente dans le cdc
      const response = await axios.post(
        "http://supafei-server.eddi.cloud:8080/user/login",
        userData
      );
      console.log('réponse envoyée en login', userData); 
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
    formData: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
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
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData } = userSlice.actions;
export default userSlice.reducer;
