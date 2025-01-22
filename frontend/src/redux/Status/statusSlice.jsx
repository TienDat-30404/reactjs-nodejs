import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // page : '',
    // limit : '',
    // totalPage : '',
    // totalOrder : '',
    data : [],
}
export const statusSlice = createSlice({
    name : 'statuss',
    initialState,
    reducers : {
        initDataStatus : (state, action) => {
            state.data = action.payload.statuss 
            // state.page = action.payload.page 
            // state.limit = action.payload.limit 
            // state.totalPage = action.payload.totalPage
            // state.totalOrder = action.payload.totalOrder
        }
    }
})

export const {initDataStatus} = statusSlice.actions 
export default statusSlice.reducer