import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : 0,
    totalPage : 0,
    totalCategory : 0,
    limit : 0,
    categories : [],
    isLoading : true
}

export const categoriesSlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        initDataCategory : (state, action) => {
            state.page = action.payload?.page
            state.totalPage = action.payload?.totalPage
            state.totalCategory = action.payload?.totalCategory
            state.limit = action.payload?.limit
            state.categories = action.payload?.categories
            state.isLoading = false
        },
        switchPage : (state, action) => {
            state.page = action.payload
        }
    }
})
export const {initDataCategory, switchPage} = categoriesSlice.actions
export default categoriesSlice.reducer