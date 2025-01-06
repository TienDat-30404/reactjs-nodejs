import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Header from "../components/Header/Header";
import LoginModal from "../../pages/Login/Login";
import SignUpModal from "../../pages/SignUp/SignUp";
import DetailMessage from "../../pages/Admin/Message/DetailMessage";
import Right from "../../pages/Content/Right/Right";
import Left from "../../pages/Content/Left/Left";
const DefaultLayout = () => {
    const { isAuthenticated, userData } = useSelector(state => state.auth)
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalSignIn, setShowModalSignIn] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
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

    const handleDisplayMessage = () => {
        setShowMessage(true)
    }
    const handleCloseMessage = () => {
        setShowMessage(false)
    }
    const actionInfo = isAuthenticated ? handleDisplayLogout : handleDisplayLogin
    return (
        <div>
            <div class="card customer_helper px-2 rounded-4" style={{ width: '70px' }}>
                <div className="d-flex flex-column border-bottom py-2">
                    <i style={{ fontSize: '27px' }} class="bi bi-chat-left-dots-fill text-white text-center"></i>
                    <h6 style={{ fontSize: '12px' }} className="text-white text-center">Trợ lý</h6>
                </div>
                <div onClick={() => handleDisplayMessage()} className="d-flex flex-column py-2">
                    <i style={{ fontSize: '27px' }} class="bi bi-chat-left-dots-fill text-white text-center"></i>
                    <h6 style={{ fontSize: '12px' }} className="text-white text-center">Tin nhắn</h6>
                </div>
            </div>
            <DetailMessage show={showMessage} close={() => handleCloseMessage()} idUser={isAuthenticated ? userData.dataLogin.idUser : null} />
            <Header />
            <div className='mt-3'>
                <div className="container">
                    <div className="col-12 row">
                        <Left />
                        <Right />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DefaultLayout