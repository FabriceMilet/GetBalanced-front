import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const userId = localStorage.getItem('id')
const token = localStorage.getItem('token')

export const getPlanners = createAsyncThunk(
  "parametre/getPlanners",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://supafei-server.eddi.cloud:8080/planner/user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
        }
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// reste à s'occupper du .env
// const apiUrl = process.env.REACT_APP_API_URL;
export const addPlanner = createAsyncThunk(
  "parametre/addPlanner",
  async (formData, thunkAPI) => {
    try {
      // il va falloir récup l'id mais formData ne le contient pas, à voir ..
      // http://supafei-server.eddi.cloud:8080
      // console.log("token",token);
      const response = await axios.post(`http://supafei-server.eddi.cloud:8080/planner/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
        }
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deletePlanner = createAsyncThunk(
  "parametre/deletePlanner",
  async (id, thunkAPI) => {
    try {
        const response = await axios.delete(
          `${apiUrl}/planner/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
            }
          }
          `http://supafei-server.eddi.cloud:8080/planner/${userId}`,
          id
        );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// création du slice
const parametreSlice = createSlice({
  name: "parametre",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    formData: { name: "", description: "", invitation: "" },
    planners: [],
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getPlanners.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPlanners.fulfilled, (state, action) => {
      state.loading = false;
      // console.log('réponse de getPlanners', action.payload);
      state.planners = action.payload;
    })
    .addCase(getPlanners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      .addCase(addPlanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlanner.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("ce qui va etre push dans extrareducer",action.payload);
        state.planners.push(action.payload);
      })
      .addCase(addPlanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePlanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlanner.fulfilled, (state, action) => {
        state.loading = false;
        // on récupère l'id du planner à supprimer
        const id = action.payload.id;
        console.log("id", action.payload);
        // on récupère l'indice du planner dans le tableau
        const index = state.planners.findIndex((planner) => planner.id == id);
        // on supprime le planner
        state.planners.splice(index, 1);
      })
      .addCase(deletePlanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openModal, setFormData } = parametreSlice.actions;
export default parametreSlice.reducer;
