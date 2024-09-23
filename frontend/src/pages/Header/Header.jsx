import React, { useRef, useEffect, useState } from "react";
import { InputComponent } from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ImageComponent from "../../components/ImageComponent";
import HeaderSupport from "./HeaderSupport";
import { useNavigate } from "react-router-dom";
import '../../public/css/header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from "../../redux/userSlice";
import { logoutUser } from "../../until/tokenUser";
import SearchAdvanced from "./SearchAdvanced";
const Header = ({ DisplayLoginOrLogout, statusHiddenLogout, setStatusHiddenLogout }) => {
    const [showModal, setShowModal] = useState(false);
    const displaySearchAdvanced = () => {
        setShowModal(true);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [word, setWord] = useState('');
    const { isAuthenticated, userData, dataCart } = useSelector((state) => state.auth);
    const idUser = isAuthenticated && userData.dataLogin.idUser
    const handleClickLogout = () => {
        logoutUser();
        dispatch(logoutSuccess());
        window.location.reload();
    };

    const avatarRef = useRef(null);
    const modalRef = useRef(null);
    const headerRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) {
                setStatusHiddenLogout(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        const handleClickInsideHeader = (event) => {
            if (headerRef.current && headerRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleClickInsideHeader);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.addEventListener("mousedown", handleClickInsideHeader);
        };
    }, [setStatusHiddenLogout]);

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
            alert("Vui lòng đăng nhập")
        }
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
                                    onClick={(e) => { e.preventDefault(); navigate(`/search?find=${word}`) }}
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
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-directional">
                                                <li ref={avatarRef} style={{ cursor: "pointer" }} onClick={DisplayLoginOrLogout} className="nav-item me-4 d-flex flex-column align-items-center ms-4">
                                                    <div className="d-flex align-items-center">
                                                        {isAuthenticated ? (
                                                            <>
                                                                <ImageComponent
                                                                    src={ userData ? userData.dataLogin.avatar : "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"} alt=""
                                                                    width="30px"
                                                                    height="30px"
                                                                    borderRadius="5px"
                                                                />
                                                                <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">{userData.dataLogin.name}</p>
                                                            </>
                                                        ) :
                                                            (
                                                                <>
                                                                    <i className="bi bi-person-circle"></i>
                                                                    <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">Tài khoản</p>
                                                                </>
                                                            )}
                                                    </div>
                                                    <div className={`info-avatar ${statusHiddenLogout ? 'd-block' : 'd-none'}`} style={{ zIndex: '3', boxShadow: '0px 0px 10px 0px', backgroundColor: 'white', position: 'absolute', left: '12%', top: '80%', width: '200px' }}>
                                                        <div className="d-flex align-items-center p-2 ">
                                                            <i className="bi bi-person-gear me-2"></i>
                                                            <p onClick={() => navigate('/profile-user')}>Thông tin cá nhân</p>
                                                        </div>
                                                        <div className="d-flex align-items-center p-2">
                                                            <i className="bi bi-box-arrow-right me-2"></i>
                                                            <p onClick={handleClickLogout}>Đăng xuất</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li onClick={switchCart} style={{ cursor: "pointer" }} className="nav-item d-flex align-items-center ms-4 ">
                                                    <i className="bi bi-cart-check-fill"></i>
                                                    <button className="btn position-relative">
                                                        Giỏ hàng
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            { dataCart ? (
                                                                dataCart.length
                                                            ) : 
                                                            0
                                                            }
                                                        </span>
                                                    </button>
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
        </div>
    )
};

export default Header;