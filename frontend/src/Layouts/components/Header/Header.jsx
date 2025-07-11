import React, { useRef, useEffect, useState } from "react";
import { InputComponent } from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import ImageComponent from "../../../components/ImageComponent";
import HeaderSupport from "./HeaderSupport";
import { useNavigate } from "react-router-dom";
import '../../../public/css/header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from "../../../redux/Auth/authSlice";
import { logoutUser } from "../../../services/UserService";
import SearchAdvanced from "./SearchAdvanced";
import { switchPage } from "../../../redux/Products/productsSlice";
import { getAllCart } from "../../../services/CartService";
import { initDataCart } from "../../../redux/Cart/cartsSlice";
import { toast } from "react-toastify";
import LoginModal from "../../../pages/Login/Login";
import Notification1 from "./Notification";
import { ToastContainer } from "react-toastify";
import SignUpModal from "../../../pages/SignUp/SignUp";
import { removeFavoriteWhenLogout } from "../../../redux/Favorite/favoritesSlice";
const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const displaySearchAdvanced = () => {
        setShowModal(true);
    }; 
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [showModalSignUp, setShowModalSignUp] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [word, setWord] = useState('');
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const notifications = useSelector(state => state?.notifications?.data)
    const totalNotificationNotRead = useSelector(state => state?.notifications.totalNotificationNotRead)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser

    const handleClickLogout = async () => {
        setShowProfile(false)
        toast.success("Đăng xuất thành công")
        await logoutUser()
        dispatch(logoutSuccess());
        dispatch(removeFavoriteWhenLogout())
        navigate('/')
    };

    const avatarRef = useRef(null);
    const modalRef = useRef(null);
    const headerRef = useRef(null);

    const totalProductInCart = useSelector(state => state.carts.totalProductInCart)

    useEffect(() => {
        const fetchDatasCart = async () => {
            if (isAuthenticated && userData) {
                try {
                    const response = await getAllCart(`idUser=${idUser}`)
                    if (response) {
                        dispatch(initDataCart(response))
                    }
                }
                catch (err) {
                    console.error("Error fetching data cart :", err);
                }
            }
        }
        fetchDatasCart()
    }, [idUser])



    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const type = queryParams.get('type');
        if (!type) {
            setWord('');
        }
    }, [window.location.search]);

    const switchCart = () => {
        if (isAuthenticated) {
            navigate(`/cart/${idUser}`)
        }
        else {
            toast.error("Vui lòng đăng nhập")
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(switchPage(1))
        navigate(`/search?find=${word}`)
    }

    const handleNagivateSignUp = () => {
        setShowModalLogin(false)
        setShowModalSignUp(true)
    }
    const handleSwitchLogin = () => {
        setShowModalLogin(true)
        setShowModalSignUp(false)
    }

    return (
        <div>
            <div className="bg-white">
                <div className="container d-flex header">
                    <div ref={headerRef} className="row col-12 bg-white" style={{ zIndex: '2' }}>
                        <div className="col-2 d-flex align-items-center">
                            <a onClick={() => navigate('/')} className="navbar-brand">
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
                                    value={word}
                                    onClick={displaySearchAdvanced}
                                    onChange={e => setWord(e.target.value)}
                                    className='form-control me-2  flex-grow-1'
                                    type='search'
                                    placeholder='TÌm kiếm tại đây'
                                    aria-label="Search"
                                />
                                <ButtonComponent
                                    className='btn btn-outline-success'
                                    type='submit'
                                    content='Search'
                                    onClick={(e) => handleSearch(e)}
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
                                            className='navbar-toggler'
                                            type='button'
                                            content={<span className="navbar-toggler-icon"></span>}
                                        />
                                        {!idUser && (
                                            <LoginModal show={showModalLogin} handleClose={() => setShowModalLogin(false)} switchSignIn={() => handleNagivateSignUp()}/>
                                        )}
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-directional">
                                                <li ref={avatarRef} style={{ cursor: "pointer" }} className="nav-item me-4 d-flex flex-column align-items-center ms-4">
                                                    <div className="d-flex align-items-center">
                                                        {isAuthenticated ? (
                                                            <div onClick={() => setShowProfile(!showProfile)} className="d-flex align-items-center">
                                                                {userData && userData?.dataLogin?.avatar == "" ? (
                                                                    <ImageComponent
                                                                        src={userData && userData?.dataLogin?.avatar != "" ? userData?.dataLogin?.avatar : "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"} alt=""
                                                                        width="30px"
                                                                        height="30px"
                                                                        borderRadius="5px"
                                                                    />
                                                                ) :
                                                                    <ImageComponent
                                                                        src={userData && userData.dataLogin.picture != "" ? userData?.dataLogin?.avatar : "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"} alt=""
                                                                        width="30px"
                                                                        height="30px"
                                                                        borderRadius="5px"
                                                                    />
                                                                }
                                                                <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">{userData.dataLogin.name}</p>
                                                            </div>
                                                        ) :
                                                            (
                                                                <div onClick={() => setShowModalLogin(!showModalLogin)} className="d-flex align-items-center">
                                                                    <i className="bi bi-person-circle"></i>
                                                                    <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">Tài khoản</p>
                                                                </div>
                                                            )}
                                                    </div>
                                                    {idUser && (
                                                        <div className={`info-avatar ${showProfile ? 'd-block' : 'd-none'}`} style={{ zIndex: '3', boxShadow: '0px 0px 10px 0px', backgroundColor: 'white', position: 'absolute', left: '12%', top: '80%', width: '200px' }}>
                                                            <div className="d-flex align-items-center p-2 ">
                                                                <i className="bi bi-person-gear me-2"></i>
                                                                <p onClick={() => navigate('/profile')}>Thông tin cá nhân</p>
                                                            </div>
                                                            <div className="d-flex align-items-center p-2">
                                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                                <p onClick={() => handleClickLogout()}>Đăng xuất</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </li>

                                                <li onClick={switchCart} style={{ cursor: "pointer" }} className="nav-item d-flex align-items-center ms-4 ">
                                                    <i className="bi bi-cart-check-fill"></i>
                                                    <button className="btn position-relative">
                                                        Giỏ hàng
                                                        {idUser && (
                                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                                {totalProductInCart ? (
                                                                    totalProductInCart
                                                                ) :
                                                                    0
                                                                }
                                                            </span>
                                                        )}
                                                    </button>
                                                </li>
                                                <li style={{ cursor: "pointer" }} className="nav-item d-flex align-items-center ms-4 ">
                                                    <i onClick={() => setShowNotification(!showNotification)} style={{ cursor: "pointer" }} class="bi bi-bell btn position-relative">
                                                        {idUser && (
                                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                                {idUser ? (
                                                                    totalNotificationNotRead
                                                                ) :
                                                                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                                                                        <div className="spinner-border text-primary" role="status"></div>
                                                                    </div>
                                                                }
                                                            </span>
                                                        )}
                                                    </i>
                                                    <Notification1 show={showNotification} />
                                                </li>
                                            </ul>
                                        </div>

                                        <SignUpModal 
                                            show = {showModalSignUp} 
                                            handleClose = {() => setShowModalSignUp(false)} 
                                            switchLogin = {() => handleSwitchLogin()}
                                        />
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
                                <div className="col-4">
                                    <i className="bi bi-geo-alt"></i>
                                    Giao đến <a>Q1, P.Bến Nghé, Hồ Chí Minh</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SearchAdvanced show={showModal} setShowModal={setShowModal} ref={modalRef} />
                </div>
                <div className="border-top border-gray"></div>
                <HeaderSupport />
            </div>
            <ToastContainer
                className="text-base"
                fontSize="10px"
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
};

export default Header;

