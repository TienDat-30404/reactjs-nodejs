import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function MenuProfile() {
  const { isAuthenticated, userData } = useSelector((state) => state.auth);


  const navigate = useNavigate()
  const switchToHomePage = () => {
    navigate('/')
  }
  return (
    <div className='col-3 px-'>
      <div className='d-flex mb-2'>
        <p onClick = {switchToHomePage} style={{ fontSize: '15px', cursor : 'pointer' }} className='fw-light me-2 switch_homepage-profile'>Trang chủ</p>
        <i style={{ fontSize: '15px' }} className="bi bi-chevron-right me-2"></i>
        <p style={{ fontSize: '15px', color: 'rgb(56, 56, 61)', fontWeight: '300' }}>Thông tin tài khoản </p>
      </div>
      <div className='d-flex align-items-center'>
        <img style={{ borderRadius: '10px' }} width="43px" height="43px" src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="" />
        <div className='ms-3'>
          <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '300' }} >Tài khoản của</p>
          {isAuthenticated ? (
            <>
              <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '300', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }}>{userData.dataLogin.name}</p>
            </>
          ) 
          : 
          (
            <p style={{ color: 'rgb(56, 56, 61)', fontWeight: '300', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }}></p>
          )
          } 
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
  )
}
