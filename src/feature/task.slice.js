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

// création du slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    error: null,
    isOpen: false,
    formData: { title: "", description: "", date: "" },
    tasks: [],
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setTasks: (state, action) => {
      // à vérifier ici, peut-être faire un .push
      state.tasks = action.payload;
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
      });
  },
});

export const { openModal, setFormData, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
