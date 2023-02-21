import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/users.slice";

export default configureStore({
    reducer:{
        user: userSlice,
    },
})