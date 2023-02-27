import { configureStore } from "@reduxjs/toolkit";
import parametreSlice from "../feature/parametre.slice";
import userSlice from "../feature/users.slice";
import dateSlice from "../feature/date.slice";
import taskSlice from "../feature/task.slice";

export default configureStore({
    reducer:{
        user: userSlice,
        parametre: parametreSlice,
        date: dateSlice,
        task: taskSlice
    },
})