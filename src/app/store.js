import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../feature/recipes.slice";

export default configureStore({
    reducer:{
        users: usersSlice,
    },
})