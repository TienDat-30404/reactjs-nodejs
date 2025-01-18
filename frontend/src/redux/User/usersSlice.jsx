import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : 0,
    totalPage : 0,
    totalUser : 0,
    limit : 0,
    users : [],
    isLoading : true
}

export const usersSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
        initDataUser : (state, action) => {
            state.page = action.payload?.page
            state.totalPage = action.payload?.totalPage
            state.totalUser = action.payload?.totalUser
            state.limit = action.payload?.limit
            state.users = action.payload?.users
            state.isLoading = false
        },
        switchPage : (state, action) => {
            state.page = action.payload
        },

        addUser : (state, action) => {
            state.users.push(action.payload)
        },

        deleteUserRedux : (state, action) => {
            const id = action.payload.id
            const existUser = state.users.find(user => user._id === id)
            if(existUser)
            {
              state.users = state.users.filter(user => user._id !== id)
            }
          }, 
    }
})
export const {initDataUser, switchPage, addUser, deleteUserRedux} = usersSlice.actions
export default usersSlice.reducer