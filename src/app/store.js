import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../feature/users.slice";

export default configureStore({
    reducer:{
        users: usersSlice,
    },
})