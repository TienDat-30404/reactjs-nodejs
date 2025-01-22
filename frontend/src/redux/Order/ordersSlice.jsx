import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : '',
    limit : '',
    totalPage : '',
    totalOrder : '',
    data : [],
}
export const ordersSlice = createSlice({
    name : 'orders',
    initialState,
    reducers : {
        initDataOrder : (state, action) => {
            state.data = action.payload.orders 
            state.page = action.payload.page 
            state.limit = action.payload.limit 
            state.totalPage = action.payload.totalPage
            state.totalOrder = action.payload.totalOrder
        },

        confirmOrderRedux : (state, action) => {
            const idOrder = action.payload.idOrder 
            const status = action.payload.status
            console.log(idOrder, status)
            const index = state.data.findIndex(order => order._id === idOrder)
            if(index != -1)
            {
                state.data[index] = {
                    ...state.data[index],
                    ...state.data[index].status.name = status
                }
            }
        }
    }
})

export const {initDataOrder, confirmOrderRedux} = ordersSlice.actions 
export default ordersSlice.reducer