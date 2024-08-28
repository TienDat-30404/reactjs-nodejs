import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Admin({right}) {
    const navigate = useNavigate()
    return (
        <div className='admin d-flex'>
            <div className='admin_left'>
                <ul class="nav flex-column admin_left-content">
                    <li class="nav-item">
                        <p style = {{ fontSize : '25px' }} class="nav-link  ">Tiki</p>
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
                </ul>
            </div>
            <div className='admin_right'>
                {right}
            </div>
        </div>
    )
}
