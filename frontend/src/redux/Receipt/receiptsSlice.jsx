import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    totalPage : '',
    totalReceipt : '',
    limit : ''
}
export const receiptsSlice = createSlice({
    name : 'receipts',
    initialState,
    reducers : {
        initDataReceipt : (state, action) => {
            state.data = action.payload.receipts 
            state.page = action.payload.page 
            state.totalPage = action.payload.totalPage
            state.totalReceipt = action.payload.totalReceipt
            state.limit = action.payload.limit 
        },

        addReceiptRedux : (state, action) => {
            state.data.push(action.payload)
            state.totalReceipt += 1
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        updateReceiptRedux : (state, action) => {   
            const {id, newData} = action.payload
            const index = state.data.findIndex(receipt => receipt._id === id)
            if(index != -1)
            {
                state.data[index] = newData
            }
        },

        deleteReceiptRedux  : (state, action) => {   
            const idReceipt = action.payload
            const index = state.data.findIndex(receipt => receipt._id === idReceipt)
            state.data.splice(index, 1)
            state.totalReceipt -= 1
        },
    }
})

export const {initDataReceipt, addReceiptRedux, switchPage, updateReceiptRedux, deleteReceiptRedux} = receiptsSlice.actions
export default receiptsSlice.reducer