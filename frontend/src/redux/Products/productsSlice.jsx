import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : 0,
    totalPage : 0,
    totalProduct : 0,
    limit : 0,
    products : [],
    isLoading : true
}

export const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
        initDataProduct : (state, action) => {
            state.page = action.payload?.page
            state.totalPage = action.payload?.totalPage
            state.totalProduct = action.payload?.totalProduct
            state.limit = action.payload?.limit
            state.products = action.payload?.products
            state.isLoading = action.payload?.isLoading
        },
        switchPage : (state, action) => {
            state.page = action.payload
        }
    }
})
export const {initDataProduct, switchPage} = productsSlice.actions
export default productsSlice.reducer