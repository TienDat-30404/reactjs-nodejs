import React from "react";
import Cookies from 'js-cookie'
import { InputComponent } from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ImageComponent from "../../components/ImageComponent";
import HeaderSupport from "./HeaderSupport";
import '../../public/css/header.css'
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from "react";
import { logoutSuccess } from "../../redux/userSlice";
import { logoutUser } from "../../until/tokenUser";
import { inputClassNameSearch, inputTypeSearch, inputPlaceholderSearch, buttonClassNameSearch, buttonTypeSearch, buttonContentSearch, buttonClassNameDisplayOrHidden, buttonTypeDisplayOrHidden, buttonContentDisplayOrHidden } from "../../until/variablesComponent/Header";
const Header = ({ DisplayLoginOrLogout, statusHiddenLogout, setStatusHiddenLogout }) => {
    const dispatch = useDispatch()
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    var userName 
    if(isAuthenticated)
    {
        const jsonTokenUser = jwtDecode(userData.dataLogin)
        userName = jsonTokenUser.name
    }
    const refreshToken = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include' // Để gửi cookie từ client đến server
        })
        const dataToken = await response.json()
        console.log(dataToken.tokenNew)
    }
    const handleClickLogout = () => {
        logoutUser()
        dispatch(logoutSuccess())
    };
    
    const avatarRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) {
                setStatusHiddenLogout(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setStatusHiddenLogout]);
    return (
        <div className="bg-white">
            <div className="container d-flex header">
                <div className="row col-12">
                    <div className="col-2 d-flex align-items-center">
                        <a className="navbar-brand">
                            <ImageComponent
                                src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                                width="100px"
                                height="50px"
                            />
                            <h6 style={{ color: 'rgb(0 62 161)' }} className="ms-2 mt-2">Tốt & nhanh</h6>
                        </a>
                    </div>
                    <div className="row col-10 d-flex align-items-center">
                        <form className="d-flex col-7" role="search">
                            <InputComponent
                                className={inputClassNameSearch}
                                type={inputTypeSearch}
                                placeholder={inputPlaceholderSearch}
                                aria-label="Search"
                            />
                            <ButtonComponent
                                className={buttonClassNameSearch}
                                type={buttonTypeSearch}
                                content={buttonContentSearch}
                            />
                        </form>
                        <div className="col-5 d-flex align-items-center">
                            <nav className="navbar navbar-expand-lg ">
                                <div className="container-fluid">

                                    <ButtonComponent
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                        className={buttonClassNameDisplayOrHidden}
                                        type={buttonTypeDisplayOrHidden}
                                        content={buttonContentDisplayOrHidden}
                                    />
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-directional">
                                            <li ref={avatarRef} style={{ cursor: "pointer" }} onClick={DisplayLoginOrLogout} className="nav-item me-4 d-flex flex-column align-items-center ms-4">
                                                <div className="d-flex align-items-center">
                                                    {isAuthenticated ? (
                                                        <>
                                                            <ImageComponent
                                                                src="https://imgt.taimienphi.vn/cf/Images/np/2020/1/3/top-anh-dai-dien-dep-chat-24.jpg"
                                                                width="30px"
                                                                height="30px"
                                                                borderRadius="5px"
                                                            />
                                                            <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">{userName}</p>
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <i className="bi bi-person-circle"></i>
                                                            <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">Tài khoản</p>
                                                        </>       
                                                    )}
                                                </div>
                                                <div className={`info-avatar ${statusHiddenLogout ? 'd-block' : 'd-none'}`} style={{ boxShadow: '0px 0px 10px 0px', backgroundColor: 'white', position: 'absolute', left: '12%', top: '80%', width: '200px' }}>
                                                    <div className="d-flex align-items-center p-2 ">
                                                        <i className="bi bi-person-gear me-2"></i>
                                                        <p style={{ color: '' }}>Thông tin cá nhân</p>
                                                    </div>
                                                    <div className="d-flex align-items-center p-2">
                                                        <i className="bi bi-box-arrow-right me-2"></i>
                                                        <p onClick={handleClickLogout}>Đăng xuất</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li style={{ cursor: "pointer" }} className="nav-item d-flex align-items-center ms-4 ">
                                                <i className="bi bi-cart-check-fill"></i>
                                                <a onClick={refreshToken} className="nav-link">Giỏ hàng</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="row col-12 align-items-center">
                            <ul className="nav col-8">
                                <li className="nav-item">
                                    <a className="nav-link active text-muted" aria-current="page">điện gia dụng</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-muted">xe cộ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-muted">mẹ & bé</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-muted">khỏe đẹp</a>
                                </li>

                            </ul>
                            <div className="col-4" >
                                <i className="bi bi-geo-alt"></i>
                                Giao đến <a>Q1, P.Bến Nghé, Hồ Chí Minh</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-top border-gray"></div>
            <HeaderSupport />
        </div>

    )
}


export default Header