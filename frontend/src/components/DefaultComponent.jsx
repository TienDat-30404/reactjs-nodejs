import React from "react";
import { useState } from "react";
import Header from "../pages/Header/Header";
import LoginModal from "../pages/Login/Login";
import SignInModal from "../pages/SingIn/SignIn";
const DefaultComponent = ({ children }) => {
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

    const handleClickLogout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    }
    const token = localStorage.getItem('token')
    var actionInfo
    if (token == null) {
        actionInfo = handleDisplayLogin
    }
    else {
        actionInfo = handleDisplayLogout
    }
    return (
        <div>
            <Header 
                DisplayLoginOrLogout={actionInfo}
                statusHiddenLogout={showLogout} 
                setStatusHiddenLogout={setShowLogout} 
                handleClickLogout={handleClickLogout}
            />
            {children}
            <LoginModal show={showModalLogin} handleClose={handleCloseModalLogin} switchSignIn={switchSignIn} />
            <SignInModal show={showModalSignIn} handleClose={handleCloseModalSignUp} switchLogin={switchLogin} />
        </div>
    )
}
export default DefaultComponent