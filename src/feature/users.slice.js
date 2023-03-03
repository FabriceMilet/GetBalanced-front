import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL
// création de la fonction qui post les données du nouvel utilisateur
export const userCheckToken = createAsyncThunk(
  "user/userCheckToken",
  async (token, thunkAPI) => {
    console.log("checkToken", token)
    try {
      const response = await axios.get("http://supafei-server.eddi.cloud:8080/token",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        });
      console.log("response refresh", response.data)
      return response.data
    } catch (err) {
      localStorage.removeItem('token');
      alert("Veuillez vous reconnecter !")
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    console.log("userData creatAccount", userData)
    try {
      // http://supafei-server.eddi.cloud:8080
      const response = await axios.post(`http://supafei-server.eddi.cloud:8080/user`, userData);
      // console.log('réponse envoyée en createUser', userData); 
      // console.log("response.data",response.data);
      // console.log('.env', env.API_BASE_URL);
      // console.log(response.data.token);

      // J'enregistre en local toutes les données envoyés par le back tant que ma connection est approuvé.
      localStorage.setItem('token', response.data.token);
      console.log("response", response.data)
      return response.data
    } catch (err) {
      console.log("erreur", err)
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      console.log("userData login", userData)
      const response = await axios.post(
        // http://supafei-server.eddi.cloud:8080
        `http://supafei-server.eddi.cloud:8080/user/login`,
        userData
      );

      // J'enregistre en local toutes les données envoyés par le back tant que ma connection est approuvé.
      localStorage.setItem('token', response.data.token);
console.log("response.data;", response.data);
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
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `http://supafei-server.eddi.cloud:8080/user/${userEditData.id}`,
        userEditData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        }
      );
      // console.log('réponse envoyée en login', userData); 
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userDeleteData, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/user/${userDeleteData.id}`,
        userDeleteData
      );
      // console.log('réponse envoyée en login', userData); 
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (userLogoutData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${apiUrl}/user/logout`,
        userLogoutData
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
        // console.log('action.payload', action.payload);
        state.userConnected = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => { // Test edit ERR401
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => { // Test edit ERR401
        state.loading = false;
        state.userConnected = action.payload
      })
      .addCase(editUser.rejected, (state, action) => { // Test edit ERR401
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => { // Test delete ERR401
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => { // Test delete ERR401
        state.loading = false;
        state.isLogged = false;
        state.userConnected = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => { // Test delete ERR401
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => { // Test logout ERR401
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => { // Test logout ERR401
        state.loading = false;
        state.isLogged = false;
        state.userConnected = {};
      })
      .addCase(logoutUser.rejected, (state, action) => { // Test logout ERR401
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userCheckToken.pending, (state) => { // Test rechargement
        state.loading = true;
      })
      .addCase(userCheckToken.fulfilled, (state, action) => { // Test rechargement
        state.loading = false;
        state.isLogged = true;
        state.userConnected = action.payload;
      })
      .addCase(userCheckToken.rejected, (state, action) => { // Test rechargement
        state.isLogged = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, refreshUserConnected } = userSlice.actions;
export default userSlice.reducer;


