import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    limit : '',
    totalPage : '',
    totalFavorite : ''
}
export const favoritesSlice = createSlice({
    name : 'favorites',
    initialState,
    reducers : {
        initDataFavorite : (state, action) => {
            state.data = action?.payload?.favorites 
            state.page = action?.payload?.page 
            state.limit = action?.payload?.limit 
            state.totalPage = action?.payload?.totalPage
            state.totalFavorite = action?.payload?.totalFavorite
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        deleteFavoriteReudx : (state, action) => {
            const id = action.payload 
            const isCheckExistFavorite = state.data.find(favorite => favorite._id === id)
            if(isCheckExistFavorite)
            {
                state.data = state.data.filter(favorite => favorite._id != id)
                state.totalFavorite -= 1
            }
        },

        addFavoriteRedux : (state, action) => {
            state.data.push(action.payload)
        }, 

        removeFavoriteWhenLogout : (state, action) => {
            state.data = []
        }
    }
})

export const {initDataFavorite, switchPage, deleteFavoriteReudx, addFavoriteRedux, removeFavoriteWhenLogout} = favoritesSlice.actions
export default favoritesSlice.reducer