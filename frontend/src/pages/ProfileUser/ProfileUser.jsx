import React from 'react'

export default function ProfileUser() {
    return (
        <div className="" >
            <div className="container d-flex">
                <div className="row col-12 mt-2">
                    <div className='col-3 px-'>
                        <div className='d-flex mb-2'>
                            <p style={{ fontSize: '15px' }} className='fw-light me-2'>Trang chủ</p>
                            <i style={{ fontSize: '15px' }} className="bi bi-chevron-right me-2"></i>
                            <p style={{ fontSize: '15px', color: 'rgb(56, 56, 61)', fontWeight: '300' }}>Thông tin tài khoản </p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <img style={{ borderRadius: '10px' }} width="43px" height="43px" src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="" />
                            <div className='ms-3'>
                                <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '300' }} >Tài khoản của</p>
                                <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '300', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }}>Đặng Tiến Đạt </p>
                            </div>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-person "></i>
                                <a className="nav-link disabled " href="#">Thông tin tài khoản</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-bell"></i>
                                <a className="nav-link disabled" href="#">Thông báo của tôi</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-card-checklist"></i>
                                <a className="nav-link disabled" href="#">Quản lí đơn hàng</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-house-up"></i>
                                <a className="nav-link disabled" aria-disabled="true">Quản lí đổi trả</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-geo-alt"></i>
                                <a className="nav-link disabled" aria-disabled="true">Số địa chỉ</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-credit-card"></i>
                                <a className="nav-link disabled" aria-disabled="true">Thông tin thanh toán</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-chat-square-heart"></i>
                                <a className="nav-link disabled" aria-disabled="true">Đánh giá sản phẩm</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-heart-fill"></i>
                                <a className="nav-link disabled" aria-disabled="true">Sản phẩm yêu thích</a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i className="bi bi-star-half"></i>
                                <a className="nav-link disabled" aria-disabled="true">Nhận xét của tôi</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-9 d-flex row'>
                        <div className='col-12'>
                            <p style={{ fontSize: '20px', marginTop: '34px', marginBottom: '16px' }} className="text-capitalize">Thông tin tài khoản</p>
                        </div>
                        <div style = {{ borderRight : '1px solid #ccc' }} className='col-6 bg-white '>
                            <div className=' px-3'>
                                <p className='p-2' style={{ color: '#666' }}>Thông tin cá nhân</p>
                                <div className='d-flex'>
                                    <div style={{ border: '4px solid rgb(194, 225, 255)', width: "100px", padding: '24px', borderRadius: '70px' }}>
                                        <img
                                            width="45px"
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt=""
                                        />
                                    </div>
                                    <div className='ms-3 flex-grow-1'>
                                        <div className='d-flex align-items-center'>
                                            <p style={{ width: '85px' }} className='text-nowrap me-2'>Họ & tên</p>
                                            <input style={{ height: '35px' }} type="text" className="form-control flex-grow-1" aria-describedby="passwordHelpBlock" />
                                        </div>
                                        <div className='d-flex align-items-center mt-4'>
                                            <p style={{ width: '85px' }} className='text-nowrap me-2'>Địa chỉ  </p>
                                            <input style={{ height: '35px' }} type="text" className="form-control flex-grow-1" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div>

                                </div>
                                <div className='d-flex align-items-center mt-4'>
                                    <p className='me-2 text-nowrap'>Ngày sinh</p>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className='d-flex align-items-center mt-4'>
                                    <p>Giới tính</p>
                                    <div className="form-check ms-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Name
                                        </label>
                                    </div>
                                    <div className="form-check ms-5">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Nữ
                                        </label>
                                    </div>
                                    <div className="form-check ms-5">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Khác
                                        </label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="button" className="btn btn-primary mb-5">Lưu thay đổi</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 bg-white py-2 '>
                            <p className='' style={{ color: '#777' }}>Số điện thoại và email</p>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <i className="bi bi-telephone me-2"></i>
                                    <div>
                                        <p>Số điện thoại</p>
                                        <p>0934224964</p>
                                    </div>
                                </div>
                                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <i class="bi bi-envelope me-2"></i>
                                    <div>
                                        <p>Địa chỉ email</p>
                                        <p>thandong@gmail.com</p>
                                    </div>
                                </div>
                                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
                            </div>
                            <p className='mt-4' style={{ color: '#777' }}>Bảo mật</p>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <i class="bi bi-envelope me-2"></i>
                                    <p>Đổi mật khẩu</p>
                                </div>
                                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <i class="bi bi-shield-check me-2"></i>
                                    <p>Thiết lập mã pin</p>
                                </div>
                                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <i class="bi bi-trash me-2"></i>
                                    <p>Yêu cầu xóa tài khoản</p>
                                </div>
                                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
                            </div>
                            <p className='mt-4' style={{ color: '#777' }}>Liên kết mạng xã hội</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
