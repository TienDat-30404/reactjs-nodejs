import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page : 1,
    totalPage : 1,
    limit : '',
    totalDiscount : 0,
    data : []
}

export const discountsSlice = createSlice({
    name : 'discounts',
    initialState,
    reducers : {
        initDataDiscount : (state, action) => {
            state.page = action.payload.page 
            state.totalPage = action.payload.totalPage 
            state.limit = action.payload.limit 
            state.totalDiscount = action.payload.totalDiscount
            state.data = action.payload.discounts
        },

        addDiscountRedux : (state, action) => {
            state.data.push(action?.payload)
            state.totalDiscount += 1
        }
    }
})

export const {initDataDiscount, addDiscountRedux} = discountsSlice.actions
export default discountsSlice.reducer