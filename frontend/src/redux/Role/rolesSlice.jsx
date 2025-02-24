import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : 0,
    totalPage : 0,
    totalRole : 0,
    limit : 0,
    roles : [],
    isLoading : true
}

export const rolesSlice = createSlice({
    name : "roles",
    initialState,
    reducers : {
        initDataRole : (state, action) => {
            state.page = action.payload?.page
            state.totalPage = action.payload?.totalPage
            state.totalRole = action.payload?.totalRole
            state.limit = action.payload?.limit
            state.roles = action.payload?.roles
            state.isLoading = action.payload?.isLoading
        },
        switchPage : (state, action) => {
            state.page = action.payload
        },

        addRoleRedux : (state, action) => {
            state.roles.push(action.payload)
        },

        updateRoleRedux : (state, action) => {
            state.roles = state.roles.map(role => {
                if(role?._id === action.payload.id)
                {
                    return action.payload.newData
                }
                return role
            })
        },

        deleteRoleRedux : (state, action) => {
            state.roles = state.roles.filter(role => role._id !== action.payload)
        }
    }
})
export const {initDataRole, switchPage, addRoleRedux, updateRoleRedux, deleteRoleRedux} = rolesSlice.actions
export default rolesSlice.reducer