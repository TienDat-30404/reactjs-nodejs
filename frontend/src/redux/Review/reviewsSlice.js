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
        },

        replyReviewRedux : (state, action) => {
            state.reviews = state.reviews.map(review => {
                if(review?._id === action.payload.id)
                {
                    return action.payload.newData
                }
                return review
            })
        }
    }
})

export const {initDataReview, addReviewRedux,loadMoreReview, replyReviewRedux} = reviewsSlice.actions
export default reviewsSlice.reducer