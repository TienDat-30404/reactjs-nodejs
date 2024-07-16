import React from "react";
import { useState } from "react";
import Header from "../pages/Header/Header";
import LoginModal from "../pages/Login/Login";
import SignInModal from "../pages/SingIn/SignIn";
const DefaultComponent = ({ children }) => {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalSignIn, setShowModalSignIn] = useState(false)
    const handleLoginClick = (event) => {
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
     
    return (
        <div>
            <Header onLoginClick={handleLoginClick} />
            <LoginModal show={showModalLogin} handleClose={handleCloseModalLogin} switchSignIn={switchSignIn} />
            {children}
            <SignInModal show={showModalSignIn} handleClose={handleCloseModalSignUp} switchLogin={switchLogin} />
        </div>
    )
}
export default DefaultComponent