import React from "react";
import {InputComponent} from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderSupport from "./HeaderSupport";
import '../../public/css/header.css'
import { useNavigate } from "react-router-dom";
import { inputClassNameSearch, inputTypeSearch, inputPlaceholderSearch, buttonClassNameSearch, buttonTypeSearch, buttonContentSearch, buttonClassNameDisplayOrHidden, buttonTypeDisplayOrHidden, buttonContentDisplayOrHidden } from "../../until/variablesComponent/Header";
const Header = ({ onLoginClick }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white">
            <div className="container d-flex header">
                <div className="row col-12">
                    <div className="col-2 d-flex align-items-center">
                        <a className="navbar-brand">
                            <img
                                src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                                width="100"
                                height="50"
                                alt="Bootstrap"
                                className="img-fluid"
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
                                            <li style = {{ cursor : "pointer" }} className="nav-item d-flex align-items-center me-4">
                                                <i className="bi bi-house-door-fill text-primary"></i>
                                                <p className="nav-link active" aria-current="page">Trang chủ</p>
                                            </li>
                                            <li style = {{ cursor : "pointer" }} onClick={onLoginClick} className="nav-item me-4 d-flex align-items-center ms-4">
                                                <i className="bi bi-person-circle"></i>
                                                <p data-bs-toggle="modal" data-bs-target="#modal_account" className="nav-link ff">Tài khoản</p>
                                            </li>
                                            <li style = {{ cursor : "pointer" }} className="nav-item d-flex align-items-center ms-4 ">
                                                <i className="bi bi-cart-check-fill"></i>
                                                <a className="nav-link">Giỏ hàng</a>
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