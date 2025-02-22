import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    reviews: [],
    page: '',
    totalPage: '',
    limit: '',
    totalReview: ''
}

export const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        initDataReview: (state, action) => {
            state.reviews = action.payload.reviews
            state.page = action.payload.page
            state.totalPage = action.payload.totalPage
            state.limit = action.payload.limit
            state.totalReview = action.payload.totalReview
        },

        addReviewRedux: (state, action) => {
            state.reviews.push(action.payload)
        },

        loadMoreReview: (state, action) => {
            state.limit += 3
        },

        replyReviewRedux: (state, action) => {
            state.reviews = state.reviews.map(review => {
                if (review?._id === action.payload.id) {
                    return action.payload.newData
                }
                return review
            })
        },

        editReplyReviewRedux: (state, action) => {
            state.reviews.forEach(review => {
                if (review?.response?.some(reply => reply._id === action.payload.id)) {
                    review.response = review.response.map(reply =>
                        reply._id === action.payload.id ? action.payload.newData : reply
                    );
                }
            });
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        deleteReviewRedux : (state, action) => {
            state.reviews = state.reviews.filter(review => review?._id !== action.payload)
            state.totalReview -= 1
        }

    }
})

export const { initDataReview, addReviewRedux, loadMoreReview, replyReviewRedux, editReplyReviewRedux, switchPage, deleteReviewRedux } = reviewsSlice.actions
export default reviewsSlice.reducer