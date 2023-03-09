import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const userId = localStorage.getItem('id')


export const getPlanners = createAsyncThunk(
  "parametre/getPlanners",
  async (_, thunkAPI) => {

    const token = localStorage.getItem('token')
    console.log("verif-token", token)

    try {
      console.log(userId);
      const response = await axios.get(`${apiUrl}/planner/user/${userId}`, {
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

export const addPlanner = createAsyncThunk(
  "parametre/addPlanner",
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('token')
    try {
      console.log(formData);
      const response = await axios.post(`${apiUrl}/planner/user/${userId}`, formData, {
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
    const token = localStorage.getItem('token')
    try {
      console.log(id);
      const response = await axios.delete(
        `${apiUrl}/planner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
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
const parametreSlice = createSlice({
  name: "parametre",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    isInvitOpen: false,
    isConfirmOpen : false,
    formData: { name: "", description: "", invitation: "" },
    planners: [],
    id: null,
    plannerIdToDelete: null,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openInvitModal: (state) => {
      state.isInvitOpen = !state.isInvitOpen;
    },
    openConfirmModal: (state) => {
      state.isConfirmOpen = !state.isConfirmOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPlannerIdToDelete: (state, action) => {
      state.plannerIdToDelete = action.payload;
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
        console.log('je supprime un planning');
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

export const { openModal, setFormData, setId, openInvitModal, openConfirmModal, setPlannerIdToDelete } = parametreSlice.actions;
export default parametreSlice.reducer;
