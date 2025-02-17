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
        },

        addSizeRedux : (state, action) => {
            state.data.push(action.payload)
            state.totalSize += 1
        },

        updateSizeRedux : (state, action) => {
            state.data = state.data.map(size => {
                if(size?._id === action.payload.id)
                {
                    return action.payload.newData
                }
                return size
            })
        },

        deleteSizeRedux : (state, action) => {
            state.data = state.data.filter(size => size._id !== action.payload)
            state.totalSize -= 1
        },

        switchPage : (state, action) => {
            state.page = action.payload
        }
    }
})

export const {initDataSize, addSizeRedux, updateSizeRedux, deleteSizeRedux, switchPage} = sizesSlice.actions 
export default sizesSlice.reducer