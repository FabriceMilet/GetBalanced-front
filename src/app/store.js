import { configureStore } from "@reduxjs/toolkit";
import plannerSlice from "../feature/planner.slice";
import userSlice from "../feature/user.slice";
import dateSlice from "../feature/date.slice";
import taskSlice from "../feature/task.slice";

export default configureStore({
    reducer:{
        user: userSlice,
        planner: plannerSlice,
        date: dateSlice,
        task: taskSlice
    },
})