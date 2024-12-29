import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    reviews : [],
    page : '',
    totalPage : '',
    limit : '',
    totalReview : ''
}

export const reviewsSlice = createSlice({
    name : "reviews",
    initialState,
    reducers : {
        initDataReview : (state, action) => {
            state.reviews = action.payload.reviews
            state.page = action.payload.page 
            state.totalPage = action.payload.totalPage
            state.limit = action.payload.limit
            state.totalReview = action.payload.totalReview
        },

        addReviewRedux : (state, action) => {
            state.reviews.push(action.payload)
        },

        loadMoreReview : (state, action) => {
            state.limit += 3
        }
    }
})

export const {initDataReview, addReviewRedux,loadMoreReview} = reviewsSlice.actions
export default reviewsSlice.reducer