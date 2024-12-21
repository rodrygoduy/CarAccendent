import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:'user',
    initialState:{
        users:{
            allUsers: [],
            isFetching:false,
            error:false

        }
    },
    reducers:{
        getUsersStart: (state)=>{
            state.users.isFetching=true
        },
        getUsersSuccess:(state,action)=>{
            state.users.isFetching=false
            state.users.allUsers= action.payload
        },
        getUsersFailed: (state)=>{
            state.users.isFetching = false
            state.users.error= true
        },
        deleteUserStart:(state)=>{
            state.users.isFetching=true

        },
        deleteUserSuccess:(state)=>{
            state.users.isFetching=false
        },
        deleteUserFailed:(state)=>{
            state.users.isFetching=false
            state.users.error=true
        }
    }
})
export const {getUsersFailed,getUsersStart,getUsersSuccess,deleteUserFailed,deleteUserSuccess,deleteUserStart} = userSlice.actions
export default userSlice.reducer