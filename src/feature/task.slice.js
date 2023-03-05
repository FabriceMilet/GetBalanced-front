import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;


export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    try {
      const { id } = useParams()
      const response = await axios.get(`${apiUrl}/task/planner/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const addTask = createAsyncThunk(
  "task/addTask",
  async (formData, thunkAPI) => {
    try {
      const { id } = useParams()
      const response = await axios.post(`${apiUrl}/task/planner/${id}`, formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const modifyTask = createAsyncThunk(
  "task/modifyTask",
  async (task, thunkAPI) => {
    try {
        const response = await axios.put(
          `${apiUrl}/task/${task.id}`,
          task
        );
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
          id
        );
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
    formData: { name: "", description: "", date: "", color: "", category: "" },
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
        // console.log('réponse de getTasks', action.payload);
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(modifyTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyTask.fulfilled, (state, action) => {
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
