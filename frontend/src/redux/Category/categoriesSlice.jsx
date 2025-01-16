import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, updateCategory } from "../../services/CategoryService";
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
        }, 

        addCategoryRedux : (state, action) => {
            state.categories.push(action.payload) 
            state.totalCategory += 1
        },
        deleteCategoryRedux  : (state, action) => {   
            const idCategory = action.payload
            const index = state.categories.findIndex(category => category._id === idCategory)
            state.categories.splice(index, 1)
            state.totalCategory -= 1
        },

        addCategoryRedux : (state, action) => {
            state.categories.push(action.payload) 
            state.totalCategory += 1
        },

        updateCategoryRedux : (state, action) => {   
            const {id, newData} = action.payload
            const index = state.categories.findIndex(category => category._id === id)
            if(index != -1)
            {
                state.categories[index] = newData
            }
        }
    }
})
export const {initDataCategory, switchPage, deleteCategoryRedux, addCategoryRedux, updateCategoryRedux} = categoriesSlice.actions
export default categoriesSlice.reducer