import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    page: '',
    totalPage: '',
    totalNotification: '',
    limit: '',
    totalNotificationNotRead: ''
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        initDataNotification: (state, action) => {
            state.data = action.payload.notifications
            state.page = action.payload.page
            state.totalPage = action.payload.totalPage
            state.totalNotification = action.payload.totalNotification
            state.limit = action.payload.limit
            state.totalNotificationNotRead = action.payload.totalNotificationNotRead
        },

        readNotificationRedux: (state, action) => {
            const id = action.payload
            const notificationIndex = state.data.findIndex(notification => notification._id === id)
            if (notificationIndex !== -1) {
                if (state?.data[notificationIndex]?.isRead === false) {
                    state.totalNotificationNotRead = state.totalNotificationNotRead - 1
                }
                else {
                    return;
                }
                console.log(state?.data[notificationIndex]?.isRead)
                state.data[notificationIndex] = {
                    ...state.data[notificationIndex],
                    isRead: true,
                }
            }

        },

        loadMoreNotification: (state, action) => {
            state.limit += 3
        },

        createNotificationRedux: (state, action) => {
            state.data.unshift(action.payload)
        },

        updateNotificationRedux: (state, action) => {
            state.data = state.data.map(notification => {
                if (notification._id === action.payload.id) {
                    return action.payload.newData
                }
                return notification
            })
        },

        switchPage: (state, action) => {
            state.page = action.payload
        },

        deleteNotificationRedux: (state, action) => {
            state.data = state.data.filter(notification => notification._id !== action.payload)
            state.totalNotification -= 1
        },

        readNotificationCommonRedux : (state, action) => {
            state.data = state.data.map(notification => {
                if(notification._id === action.payload.id)
                {
                    return action.payload.newDate
                }
                return notification
            })
        }
    }
})

export const { initDataNotification, readNotificationRedux, 
    loadMoreNotification, createNotificationRedux, updateNotificationRedux, switchPage, deleteNotificationRedux, readNotificationCommonRedux } = notificationsSlice.actions
export default notificationsSlice.reducer