import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = [{id : 1, title: 'faire les courses', description: 'bbbbbb', date: '2023-03-03', borderColor: null, userId: null, category: null},
      {id : 2, title: 'médecin Lucio', description: '17:30', date: '2023-03-01', borderColor: null, userId: null, category: null},
      {id : 3, title: 'test 3 ', description: 'bonjour', date: '2023-03-04', borderColor: null, userId: null, category: null}];
      // voir ici avec le back quelle route appeler
      //   const response = await axios.get(
      //     "http://localhost:3001/planners/:id/tasks"
      //   );
      // quand je ferai appel à l'api, ne pas oublier de remettre return response.data
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const addTask = createAsyncThunk(
  "task/addTask",
  async (formData, thunkAPI) => {
    try {
      const response = formData;
      // voir ici avec le back quelle route appeler
      //   const response = await axios.post(
      //     "http://localhost:3001/planners",
      //     formData
      //   );
      // quand je ferai appel à l'api, ne pas oublier de remettre return response.data
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const modifyTask = createAsyncThunk(
  "task/modifyTask",
  async (task, thunkAPI) => {
    try {
      const response = task;
      // voir ici avec le back quelle route appeler
      //   const response = await axios.put(
      //     "http://localhost:3001/task/:id/planner/:id",
      //     formData
      //   );
      // quand je ferai appel à l'api, ne pas oublier de remettre return response.data
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = id;
      console.log('id de la tache à supprimer :', id);
      // voir ici avec le back quelle route appeler
      //   const response = await axios.delete(
      //     "http://localhost:3001/task/:id/planner/:id",
      //     formData
      //   );
      // quand je ferai appel à l'api, ne pas oublier de remettre return response.data
      return response;
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
    formData: { title: "", description: "", date: "", color: "", category:"" },
    tasks: [],
    taskToModify: {},
    dateOfNewTask: ""
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
      state.tasks = action.payload
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
         // on récupère l'id de la tâche à modifier
         const id = action.payload;
         // quand je vais recevoir les vrais données, il faudra changer par const id = action.payload.id;
         // car on renvevra je pense toute la tâche
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
