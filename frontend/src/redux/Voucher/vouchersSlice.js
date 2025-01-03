import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    page : '',
    limit : '',
    totalPage : '',
    totalVoucher : '',
    useVoucher : []
}

export const vouchersSlice = createSlice({
    name : "vouchers",
    initialState,
    reducers : {
        initDataVoucher : (state, action) => {
            if (state.useVoucher.length === 0) {
                state.data = action?.payload?.vouchers;
                state.page = action?.payload?.page;
                state.limit = action.payload.limit;
                state.totalPage = action.payload.totalPage;
                state.totalVoucher = action.payload.totalVoucher;
            }
        }, 

        addVoucher : (state, action) => {
            state.data.push(action.payload)
        },

        applyVoucher : (state, action) => {
            state.useVoucher.push(action?.payload)
        },

        removeUseVoucher : (state, action) => {
            state.useVoucher = []
        },

        deleteVoucher : (state, action) => {
            const id = action?.payload
            const existVoucher = state.data.find(voucher => voucher._id === id)
            if(existVoucher)
            {
                state.useVoucher = id
                state.data = state.data.filter(voucher => voucher._id != id)
            }
        }
    }
})

export const {initDataVoucher, applyVoucher, removeUseVoucher, deleteVoucher, addVoucher} = vouchersSlice.actions
export default vouchersSlice.reducer