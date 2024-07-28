import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Header from "../pages/Header/Header";
import LoginModal from "../pages/Login/Login";
import SignInModal from "../pages/SingIn/SignIn";

const DefaultComponent = ({ children }) => {
    const {isAuthenticated} = useSelector(state => state.auth)
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalSignIn, setShowModalSignIn] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const handleDisplayLogin = (event) => {
        event.preventDefault();
        setShowModalLogin(true);
    };

    const handleCloseModalLogin = () => {
        setShowModalLogin(false);
    };

    const switchSignIn = () => {
        setShowModalLogin(false)
        setShowModalSignIn(true)
    }

    const handleCloseModalSignUp = () => {
        setShowModalSignIn(false);
    };

    const switchLogin = () => {
        setShowModalLogin(true)
        setShowModalSignIn(false)
    }

    const handleDisplayLogout = () => {
        setShowLogout(!showLogout)
    }

    const actionInfo = isAuthenticated ? handleDisplayLogout : handleDisplayLogin
    return (
        <div>
            <Header 
                DisplayLoginOrLogout={actionInfo}
                statusHiddenLogout={showLogout} 
                setStatusHiddenLogout={setShowLogout} 
            />
            {children}
            <LoginModal show={showModalLogin} handleClose={handleCloseModalLogin} switchSignIn={switchSignIn} />
            <SignInModal show={showModalSignIn} handleClose={handleCloseModalSignUp} switchLogin={switchLogin} />
        </div>
    )
}
export default DefaultComponent