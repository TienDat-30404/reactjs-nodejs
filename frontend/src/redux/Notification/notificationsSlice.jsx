import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    totalPage : '',
    totalNotification : '',
    limit : ''
}

export const notificationsSlice = createSlice({
    name : 'notifications',
    initialState,
    reducers : {
        initDataNotification : (state, action) => {
            state.data = action.payload.notifications
            state.page = action.payload.page 
            state.totalPage = action.payload.totalPage
            state.totalNotification = action.payload.totalNotification
            state.limit = action.payload.limit 
        }, 

        readNotificationRedux : (state, action) => {
            const id = action.payload
            const notificationIndex = state.data.findIndex(notification => notification._id === id)
            if(notificationIndex !== -1)
            {
                state.data[notificationIndex] = {
                    ...state.data[notificationIndex],
                    isRead : true
                }
            }
        }
    }
})

export const {initDataNotification, readNotificationRedux} = notificationsSlice.actions
export default notificationsSlice.reducer