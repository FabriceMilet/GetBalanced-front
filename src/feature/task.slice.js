import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (id, thunkAPI) => {
    try {
      // console.log('id récup', id)
      const response = await axios.get(`${apiUrl}/task/planner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
        }
      });
      console.log('response.data', response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const addTask = createAsyncThunk(
  "task/addTask",
  async ({formData, id}, thunkAPI) => {
    try {
      console.log('envoyé au back',formData);
      const response = await axios.post(`${apiUrl}/task/planner/${id}`, formData, {
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
export const modifyTask = createAsyncThunk(
  "task/modifyTask",
  async ({updatedTask , id}, thunkAPI) => {
    try {
      console.log('je modifie et jenvoie', updatedTask
      );
        const response = await axios.put(
          `${apiUrl}/task/${id}`, updatedTask, 
         {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        console.log('response.data de modify', response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      console.log("id de la tache à supprimer :", id);
        const response = await axios.delete(
          `${apiUrl}/task/${id}`,
           {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        console.log('response.data de lid à supprimer', response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// création du slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    isModifyOpen: false,
    formData: { name: "", description: "", date: "", border_color: "", category: "" },
    tasks: [],
    taskToModify: {},
    dateOfNewTask: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.dateOfNewTask = action.payload;
      state.isOpen = !state.isOpen;
    },
    openModifyModal: (state, action) => {
      state.taskToModify = action.payload;
      state.isModifyOpen = !state.isModifyOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        console.log('je récupère', action.payload);
        state.tasks = action.payload;
        // state.tasks.push(action.payload);
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log('jajoute ',action.payload );
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(modifyTask.pending, (state) => {
        state.loading = true;
        console.log('en attente');
      })
      .addCase(modifyTask.fulfilled, (state, action) => {
        console.log('je modifie ',action.payload );
        state.loading = false;
        // console.log("tâche modifiée:", action.payload);
        // on récupère l'id de la tâche à modifier
        const id = action.payload.id;
        // on récupère l'indice de la tâche dans le tableau
        const index = state.tasks.findIndex((task) => task.id === id);
        // on remplace la tâche dans le tableau
        state.tasks.splice(index, 1, action.payload);
      })
      .addCase(modifyTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("tâche à supprimer :", action.payload);
        // on récupère l'id de la tâche à supprimer
        const id = action.payload.id;
        // quand je vais recevoir les vrais données, il faudra changer par const id = action.payload.id;
        // on récupère l'indice de la tâche dans le tableau
        const index = state.tasks.findIndex((task) => task.id == id);
        // on supprime la tâche
        state.tasks.splice(index, 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openModal, setFormData, setTasks, openModifyModal } =
  taskSlice.actions;
export default taskSlice.reducer;
