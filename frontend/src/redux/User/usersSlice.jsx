import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../services/UserService";
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

        addUserRedux : (state, action) => {
            state.users.push(action.payload)
        },

        deleteUserRedux : (state, action) => {
            const id = action.payload
            const existUser = state.users.find(user => user._id === id)
            if(existUser)
            {
              state.users = state.users.filter(user => user._id !== id)
            }
          }, 

        updateUserRedux : (state, action) => {
            const {id, data} = action.payload
            console.log("123", id, data)
            const index = state.users.findIndex(user => user._id === id)
            if(index !== -1)
            {
                console.log("index", index)
                state.users[index] = {
                    ...state.users[index],
                    name : data.name,
                    address : data.address,
                    phone : data.phone,
                    date_of_birth : data.date_of_birth, 
                    sex : data.sex,
                    avatar : data.avatar
                }
            }
        }
    }
})
export const {initDataUser, switchPage, addUserRedux, deleteUserRedux, updateUserRedux} = usersSlice.actions
export default usersSlice.reducer