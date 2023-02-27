import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

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
  async (formData, thunkAPI) => {
    try {
      const response = formData;
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
      console.log(id);
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
    formData: { title: "", description: "", date: "", color:"" },
    tasks: [],
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openModifyModal: (state) => {
      state.isModifyOpen = !state.isModifyOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        console.log('tâche modifiée:', action.payload);
        // il va falloir remplacer l'ancienne tâche par la nouvelle
        // je pense de la manière suivante donc besoin de trouver comment récup l'indice de la tâche
        // state.tasks.slice("indice de l'élément à supprimer", 1, action.payload);
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
        console.log('tâche à supprimer :', action.payload);
        // à voir ici quoi faire exactement, il va falloir remplacer l'ancienne tâche par la nouvelle
        // peut-être faire un .splice et dans ce cas trouver comment récup l'inddice de la tâche
        // state.tasks.splice("indice de l'élément à supprimer", 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openModal, setFormData, setTasks, openModifyModal  } = taskSlice.actions;
export default taskSlice.reducer;
