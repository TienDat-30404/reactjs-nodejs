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
        }, 

        deleteVoucherReduxAdmin : (state, action) => {
            state.data = state.data.filter(voucher => voucher._id !== action.payload)
            state.totalVoucher -= 1
        },

        switchPage : (state, action) => {
            state.page = action.payload
        },

        editVoucherRedux : (state, action) => {
            state.data = state.data.map(voucher => {
                if(voucher._id === action.payload._id)
                {
                    return action.payload.newData
                }
                return voucher
            })
        }
    }
})

export const {initDataVoucher, applyVoucher, removeUseVoucher, deleteVoucher, addVoucher, deleteVoucherReduxAdmin, switchPage, editVoucherRedux} = vouchersSlice.actions
export default vouchersSlice.reducer