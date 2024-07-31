import React from 'react'

export default function InformationSecurityProfile() {
    return (
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
                    <i className="bi bi-envelope me-2"></i>
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
                    <i className="bi bi-envelope me-2"></i>
                    <p>Đổi mật khẩu</p>
                </div>
                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-shield-check me-2"></i>
                    <p>Thiết lập mã pin</p>
                </div>
                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-trash me-2"></i>
                    <p>Yêu cầu xóa tài khoản</p>
                </div>
                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <p className='mt-4' style={{ color: '#777' }}>Liên kết mạng xã hội</p>

        </div>
    )
}
