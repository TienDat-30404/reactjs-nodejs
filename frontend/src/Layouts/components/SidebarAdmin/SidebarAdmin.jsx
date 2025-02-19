import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function SidebarAdmin() {
    const navigate = useNavigate()
    const [showContetProduct, setShowContetProduct] = useState(false)
    return (
        <div className='admin_left'>
            <ul class="nav flex-column admin_left-content">
                <li class="nav-item">
                    <p style={{ fontSize: '25px' }} class="nav-link  ">Tiki</p>
                </li>
                <li class="nav-item">
                    <i class="bi bi-grid-3x3-gap"></i>
                    <p class="nav-link">DashBoard</p>
                </li>
                <li onClick={() => navigate('/admin/user')} class="nav-item">
                    <i class="bi bi-person-gear"></i>
                    <p class="nav-link">User</p>
                </li>

                <li onClick={() => setShowContetProduct(!showContetProduct)} class="nav-item d-flex align-items-center justify-content-between">
                    <div className='d-flex align-items-center'>
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Product</p>
                    </div>
                    <i class="bi bi-chevron-compact-down px-3"></i>
                </li>

                <ul className={`${showContetProduct ? 'd-block' : 'd-none'}`}>
                    <li onClick={() => navigate('/admin/product')} class="nav-item">
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Product</p>
                    </li>
                    <li onClick={() => navigate('/admin/attribute')} class="nav-item">
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Attribute</p>
                    </li>
                    <li onClick={() => navigate('/admin/category')} class="nav-item">
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Category</p>
                    </li>
                </ul>

                <li onClick={() => navigate('/admin/order')} class="nav-item">
                    <i class="bi bi-p-square"></i>
                    <p class="nav-link">Order</p>
                </li>
                <li onClick={() => navigate('/admin/supplier')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Supplier</p>
                </li>
                <li onClick={() => navigate('/admin/receipt')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Receipt</p>
                </li>
                <li onClick={() => navigate('/admin/discount')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Discount</p>
                </li>
                <li onClick={() => navigate('/admin/voucher')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Voucher</p>
                </li>
                {/* 
                <li onClick={() => navigate('/admin/role')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Role</p>
                </li>
                <li onClick={() => navigate('/admin/review')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Review</p>
                </li>
                <li onClick={() => navigate('/admin/review')} class="nav-item">
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Review</p>
                </li> */}
            </ul>
        </div>
    )
}
