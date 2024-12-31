import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    vouchers : [],
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
                state.vouchers = action.payload.vouchers;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPage = action.payload.totalPage;
                state.totalVoucher = action.payload.totalVoucher;
            }
        }, 

        applyVoucher : (state, action) => {
            state.useVoucher.push(action?.payload)
        },

        removeUseVoucher : (state, action) => {
            state.useVoucher = []
        },

        deleteVoucher : (state, action) => {
            const id = state.vouchers._id
            const existVoucher = state.vouchers.find(voucher => voucher._id === id)
            if(existVoucher)
            {
                state.vouchers = state.vouchers.filter(voucher => voucher._id != id)
            }
        }
    }
})

export const {initDataVoucher, applyVoucher, removeUseVoucher, deleteVoucher} = vouchersSlice.actions
export default vouchersSlice.reducer