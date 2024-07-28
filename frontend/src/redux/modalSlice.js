// redux/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModalLogin: false,
        showModalSignIn: false,
        showLogout: false,
    },
    reducers: {
        showLoginModal(state) {
            state.showModalLogin = true;
        },
        hideLoginModal(state) {
            state.showModalLogin = false;
        },
        showSignInModal(state) {
            state.showModalSignIn = true;
        },
        hideSignInModal(state) {
            state.showModalSignIn = false;
        },
        toggleLogout(state) {
            state.showLogout = !state.showLogout;
        }
    }
});

export const { showLoginModal, hideLoginModal, showSignInModal, hideSignInModal, toggleLogout } = modalSlice.actions;
export default modalSlice.reducer;