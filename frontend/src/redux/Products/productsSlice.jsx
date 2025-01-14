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
            state.isLoading = false
        },
        switchPage : (state, action) => {
            state.page = action.payload
        },

        deleteProductRedux : (state, action) => {
            const id = action.payload 
            const isExistProduct = state.products.find(product => product._id ===id)
            if(isExistProduct)
            {
                state.products = state.products.filter(product => product._id !== id)
            }
        },

        updateProductRedux : (state, action) => {
            const {id, newData} = action.payload 
            console.log("id", id)
            console.log("newData", newData)
            const productIndex = state.products.findIndex(product => product._id === id)
            if(productIndex != -1)
            {
                state.products[productIndex] = newData
            }
        }
    }
})
export const {initDataProduct, switchPage, deleteProductRedux, updateProductRedux} = productsSlice.actions
export default productsSlice.reducer