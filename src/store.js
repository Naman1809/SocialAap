import {configureStore} from "@reduxjs/toolkit";
import { allUsersReducer, postOfFollowingReducer, userReducer } from "./Reducers/User";
import { likeReducer } from "./Reducers/Post";
 const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
    }
});

export default store;