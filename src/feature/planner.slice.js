import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPlanners = createAsyncThunk(
  "planner/getPlanners",
  async (_, thunkAPI) => {
    const userId = Cookies.get('id')
    const token = Cookies.get('token');
  
    try {
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
  "planner/addPlanner",
  async (formData, thunkAPI) => {
    const token = Cookies.get('token');
    try {
      const userId = Cookies.get('id')
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
  "planner/deletePlanner",
  async (id, thunkAPI) => {
    const token = Cookies.get('token');
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
const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    isInvitOpen: false,
    isConfirmOpen: false,
    formData: { name: "", description: "", invitation: "" },
    planners: [],
    id: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlanners.fulfilled, (state, action) => {
        state.loading = false;
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

export const { openModal, setFormData, setId, openInvitModal, openConfirmModal } = plannerSlice.actions;
export default plannerSlice.reducer;
