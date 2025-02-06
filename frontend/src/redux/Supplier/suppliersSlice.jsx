import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    totalPage : '',
    totalSupplier : '',
    limit : ''
}
export const suppliersSlice = createSlice({
    name : 'suppliers',
    initialState,
    reducers : {
        initDataSupplier : (state, action) => {
            state.data = action.payload.suppliers 
            state.page = action.payload.page 
            state.totalPage = action.payload.totalPage
            state.totalSupplier = action.payload.totalSupplier
            state.limit = action.payload.limit 
        },

        addSupplierRedux : (state, action) => {
            state.data.push(action.payload)
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        updateSupplierRedux : (state, action) => {   
            const {id, newData} = action.payload
            const index = state.data.findIndex(supplier => supplier._id === id)
            if(index != -1)
            {
                state.data[index] = newData
            }
        },

        deleteSupplierRedux  : (state, action) => {   
            const idSupplier = action.payload
            const index = state.data.findIndex(supplier => supplier._id === idSupplier)
            if(index != -1)
            {
                console.log(state.data)
                state.data.splice(index, 1)
                state.totalSupplier -= 1
            }
        },


        deleteProductOfSupplierRedux : (state, action) => {
            const idSupplier = action.payload
            console.log(idSupplier)
            const index = state.data.findIndex(supplier => supplier._id === idSupplier)
            if(index != -1)
            {
                state.data[0]?.supplierDetails.splice(0, 1)
            }
        }
    }
})

export const {initDataSupplier, addSupplierRedux, switchPage, updateSupplierRedux, deleteSupplierRedux, deleteProductOfSupplierRedux} = suppliersSlice.actions
export default suppliersSlice.reducer