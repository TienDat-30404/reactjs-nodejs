import { createSlice } from "@reduxjs/toolkit";
import { updateDiscount } from "../../services/DiscountService";
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
        },

        deleteDiscountRedux : (state, action) => {
            state.data = state.data.filter(discount => discount._id !== action.payload)
            state.totalDiscount -= 1
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        updateDiscountRedux : (state, action) => {
            state.data = state.data.map(discount => {
                if(discount._id === action.payload.id) {
                    return action.payload.newData
                }
                return discount
            })
        }
    }
})

export const {initDataDiscount, addDiscountRedux, deleteDiscountRedux, switchPage, updateDiscountRedux} = discountsSlice.actions
export default discountsSlice.reducer