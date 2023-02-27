import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// création de la fonction qui post les données du nouvel utilisateur
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://supafei-server.eddi.cloud:8080/user", userData);
      // console.log('réponse envoyée en createUser', userData); 
      // console.log("response.data",response.data)
      // console.log('.env', env.API_BASE_URL);
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://supafei-server.eddi.cloud:8080/user/login",
        userData
      );
      console.log('réponse envoyée en login', userData); 
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// thunk qui envoie les modifs de l'utilisateur a la bdd 
export const editUser = createAsyncThunk(
  "user/editUser",
  async (userEditData, thunkAPI) => {
    console.log(userEditData)
    try {
      const response = await axios.post(
        "",
        userEditData
      );
      // console.log('réponse envoyée en login', userData); 
      // console.log(response.data);
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
    userConnected: {
    }
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
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        console.log('action.payload du create', action.payload);
        state.userConnected = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        console.log('action.payload', action.payload);
        state.userConnected = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => { // Test 
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => { // Test
        state.loading = false;
        state.userConnected = action.payload
      })
      .addCase(editUser.rejected, (state, action) => { // Test
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData } = userSlice.actions;
export default userSlice.reducer;
