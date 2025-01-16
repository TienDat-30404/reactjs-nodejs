import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function SidebarAdmin() {
    const navigate = useNavigate()
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
                <li onClick={() => navigate('/admin/product')} class="nav-item">
                    <i class="bi bi-p-square"></i>
                    <p class="nav-link">Product</p>
                </li>
                <li onClick={() => navigate('/admin/category')} class="nav-item">
                    <i class="bi bi-p-square"></i>
                    <p class="nav-link">Category</p>
                </li>
                <li onClick={() => navigate('/admin/order')} class="nav-item">
                    <i class="bi bi-p-square"></i>
                    <p class="nav-link">Order</p>
                </li>
            </ul>
        </div>
    )
}
