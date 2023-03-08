import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// création de la fonction qui post les données du nouvel utilisateur
export const userCheckToken = createAsyncThunk(
  "user/userCheckToken",
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/token`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        });

      console.log("response", response.data)

      //localStorage.setItem('token', response.data.token);
      //localStorage.setItem('id', response.data.user.id);

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

      const response = await axios.post(`${apiUrl}/user`, userData);

      // console.log('réponse envoyée en createUser', userData); 
      // console.log("response.data",response.data);
      // console.log('.env', env.API_BASE_URL);
      // console.log(response.data.token);

      // J'enregistre en local toutes les données envoyés par le back tant que ma connection est approuvé.
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.user.id);

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
      //console.log("userData login", userData)
      console.log("YES le code va bien jusqu'ici !")
      const response = await axios.post(

        `${apiUrl}/user/login`,
        userData
      );
      // J'enregistre en local toutes les données envoyés par le back tant que ma connection est approuvé.
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.user.id);
      console.log('response.data', response.data);

      return response.data;
    } catch (err) {
      console.log("ERREUR ! : ", err)
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// thunk qui envoie les modifs de l'utilisateur a la bdd 
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ updatedFormData, id }, thunkAPI) => {
    console.log("data", updatedFormData)
    console.log("id", id)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${apiUrl}/user/${id}`,
        updatedFormData,
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
      console.log(err)
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, thunkAPI) => {
    const { id, userDeleteData } = data;
    // console.log("id ----->>>", id) OK
    // console.log("userDeleteData ----->>>>", userDeleteData) OK




    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `http://barbaraouisse-server.eddi.cloud:8080/user/${id}`,
        userDeleteData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
          }
        }
      );

      // console.log('réponse envoyée en login', userData); 
      console.log("response lors du delete", response.data);
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
        state.succes = "vous êtes connecté !";
        state.erreur = null;
        state.loading = false;
        state.isLogged = true;
        // console.log('action.payload', action.payload);
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
      .addCase(deleteUser.fulfilled, (state, action) => { // Test delete ERR401
        state.loading = false;
        state.isLogged = false;
        state.userConnected = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => { // Test delete ERR401
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

export const { setFormData, refreshUserConnected, userLogout } = userSlice.actions;
export default userSlice.reducer;


