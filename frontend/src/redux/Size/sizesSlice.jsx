import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    limit : '',
    totalPage : '',
    totalSize : ''
}
export const sizesSlice = createSlice({
    name : 'sizes',
    initialState, 
    reducers : {
        initDataSize : (state, action) => {
            state.data = action?.payload?.sizes 
            state.page = action?.payload?.page 
            state.limit = action?.payload?.limit 
            state.totalPage = action?.payload?.totalPage 
            state.totalSize = action?.payload?.totalSize
        }
    }
})

export const {initDataSize} = sizesSlice.actions 
export default sizesSlice.reducer