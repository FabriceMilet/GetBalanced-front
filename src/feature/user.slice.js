import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

// fonction qui envoie le token au back pour le middleware de login
export const userCheckToken = createAsyncThunk(
  "user/userCheckToken",
  async (_, thunkAPI) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`${apiUrl}/token`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        });
      return response.data
    } catch (err) {
      Cookies.remove('token');
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    console.log("userData creatAccount", userData)
    try {
      const response = await axios.post(`${apiUrl}/user`, userData);
      // je stocke le token et l'id dans les cookies
      Cookies.set('id', response.data.user.id);
      Cookies.set('token', response.data.token);

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
      const response = await axios.post(

        `${apiUrl}/user/login`,
        userData
      );
       // je stocke le token et l'id dans les cookies
       Cookies.set('id', response.data.user.id);
       Cookies.set('token', response.data.token);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// thunk qui envoie les modifs de l'utilisateur a la bdd 
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ updatedFormData, id }, thunkAPI) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.patch(
        `${apiUrl}/user/${id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.delete(
        `${apiUrl}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        }
      ).then(() => { Cookies.remove('token'); });

      return response.data;
    } catch (err) {
      console.log("erreur delete", err)
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const inviteUser = createAsyncThunk(
  "user/inviteUser",
  async ({ email, userId, plannerId }, thunkAPI) => {
    const token = Cookies.get('token');
    
    try {
      const response = await axios.post(
        `${apiUrl}/invite/${userId}/planner/${plannerId}`, { 'email': email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
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
    erreur: null,
    succes: null,
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
    userLogout: (state, action) => {
      state.isLogged = false;
      state.userConnected = {};
      state.succes = "Vous êtes déconnecté !";
      state.erreur = null;
    },
    setSucces: (state, action) => {
      state.succes = action.payload;
    }
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
        state.succes = "Création de compte OK !";
        state.erreur = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.succes = null;
        state.erreur = "Problème de création de compte"
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.succes = "Vous êtes connecté !";
        state.erreur = null;
        state.loading = false;
        state.isLogged = true;
        state.userConnected = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.succes = null;
        state.erreur = "Erreur lors de la connexion";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => { // Test edit ERR401
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => { // Test edit ERR401
        state.succes = "Modification validée ! !";
        state.erreur = null;
        state.loading = false;
        state.userConnected = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => { // Test edit ERR401
        state.succes = null;
        state.erreur = "erreur de modification de compte";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => { // Test delete ERR401
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => { // Test delete ERR401
        state.succes = "Utilisateur supprimé !";
        state.loading = false;
        state.isLogged = false;
        state.userConnected = {};
      })
      .addCase(deleteUser.rejected, (state, action) => { // Test delete ERR401
        state.loading = false;
        state.erreur = "Erreur de suppresion d'utilisateur";
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
      })
      .addCase(inviteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(inviteUser.fulfilled, (state) => {
        state.succes = "utilisateur invité !";
        state.loading = false;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.erreur = "erreur d'invitation !";
      });
  },
});

export const { setFormData, refreshUserConnected, userLogout, setSucces} = userSlice.actions;
export default userSlice.reducer;


