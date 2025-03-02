import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRoleDetail } from '../../../until/function'
export default function SidebarAdmin() {
    const navigate = useNavigate()
    const [showContetProduct, setShowContetProduct] = useState(false)
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)

    const hasPermission = (actionName) => {
        return roleDetails?.permissions.some(
            (item) => item.action.toLowerCase().includes(actionName) && item.allow === true
        );
    };
    return (
        <div className='admin_left'>
            <ul class="nav flex-column admin_left-content">
                <li class="nav-item">
                    <p style={{ fontSize: '25px' }} class="nav-link  ">Tiki</p>
                </li>
                <li
                    onClick={() => navigate('/admin/dashboard')}
                    aria-disabled={!hasPermission('overview_statistic')}
                    style={{
                        pointerEvents: hasPermission('overview_statistic') ? 'auto' : 'none',
                        opacity: hasPermission('overview_statistic') ? 1 : 0.5
                    }}
                >

                    <i class="bi bi-grid-3x3-gap"></i>
                    <p class="nav-link">DashBoard</p>
                </li>
                <li
                    onClick={() => navigate('/admin/user')}
                    className="nav-item"
                    aria-disabled={!hasPermission('user')}
                    style={{
                        pointerEvents: hasPermission('user') ? 'auto' : 'none',
                        opacity: hasPermission('user') ? 1 : 0.5
                    }}
                >
                    <i className="bi bi-person-gear"></i>
                    <p className="nav-link">User</p>
                </li>

                <li
                    onClick={() => setShowContetProduct(!showContetProduct)}
                    class="nav-item d-flex align-items-center justify-content-between"
                >
                    <div className='d-flex align-items-center'>
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Product</p>
                    </div>
                    <i class="bi bi-chevron-compact-down px-3"></i>
                </li>

                <ul className={`${showContetProduct ? 'd-block' : 'd-none'}`}>
                    <li
                        onClick={() => navigate('/admin/product')}
                        class="nav-item"
                        aria-disabled={!hasPermission('product')}
                        style={{
                            pointerEvents: hasPermission('product') ? 'auto' : 'none',
                            opacity: hasPermission('product') ? 1 : 0.5
                        }}
                    >
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Product</p>
                    </li>
                    <li
                        onClick={() => navigate('/admin/attribute')}
                        class="nav-item"
                        aria-disabled={!hasPermission('attribute')}
                        style={{
                            pointerEvents: hasPermission('attribute') ? 'auto' : 'none',
                            opacity: hasPermission('attribute') ? 1 : 0.5
                        }}
                    >
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Attribute</p>
                    </li>
                    <li
                        onClick={() => navigate('/admin/category')}
                        class="nav-item"

                        aria-disabled={!hasPermission('category')}
                        style={{
                            pointerEvents: hasPermission('category') ? 'auto' : 'none',
                            opacity: hasPermission('category') ? 1 : 0.5
                        }}>
                        <i class="bi bi-p-square"></i>
                        <p class="nav-link">Category</p>
                    </li>
                </ul>

                <li
                    onClick={() => navigate('/admin/order')}
                    class="nav-item"

                    aria-disabled={!hasPermission('order')}
                    style={{
                        pointerEvents: hasPermission('order') ? 'auto' : 'none',
                        opacity: hasPermission('order') ? 1 : 0.5
                    }}>
                    <i class="bi bi-p-square"></i>
                    <p class="nav-link">Order</p>
                </li>

                <li
                    onClick={() => navigate('/admin/supplier')}
                    class="nav-item"
                    aria-disabled={!hasPermission('supplier')}
                    style={{
                        pointerEvents: hasPermission('supplier') ? 'auto' : 'none',
                        opacity: hasPermission('supplier') ? 1 : 0.5
                    }}
                >
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Supplier</p>
                </li>

                <li
                    onClick={() => navigate('/admin/receipt')}
                    class="nav-item"
                    aria-disabled={!hasPermission('receipt')}
                    style={{
                        pointerEvents: hasPermission('receipt') ? 'auto' : 'none',
                        opacity: hasPermission('receipt') ? 1 : 0.5
                    }}
                >
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Receipt</p>
                </li>

                <li
                    onClick={() => navigate('/admin/discount')}
                    class="nav-item"

                    aria-disabled={!hasPermission('discount')}
                    style={{
                        pointerEvents: hasPermission('discount') ? 'auto' : 'none',
                        opacity: hasPermission('discount') ? 1 : 0.5
                    }}>
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Discount</p>
                </li>

                <li
                    onClick={() => navigate('/admin/voucher')}
                    class="nav-item"

                    aria-disabled={!hasPermission('voucher')}
                    style={{
                        pointerEvents: hasPermission('voucher') ? 'auto' : 'none',
                        opacity: hasPermission('voucher') ? 1 : 0.5
                    }}>
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Voucher</p>
                </li>

                <li
                    onClick={() => navigate('/admin/notification')}
                    class="nav-item"

                    aria-disabled={!hasPermission('notification')}
                    style={{
                        pointerEvents: hasPermission('notification') ? 'auto' : 'none',
                        opacity: hasPermission('notification') ? 1 : 0.5
                    }}>
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Notification</p>
                </li>

                <li
                    onClick={() => navigate('/admin/review')}
                    class="nav-item"

                    aria-disabled={!hasPermission('review')}
                    style={{
                        pointerEvents: hasPermission('review') ? 'auto' : 'none',
                        opacity: hasPermission('review') ? 1 : 0.5
                    }}>
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Review</p>
                </li>

                <li
                    onClick={() => navigate('/admin/role')}
                    class="nav-item"

                    aria-disabled={!hasPermission('role')}
                    style={{
                        pointerEvents: hasPermission('role') ? 'auto' : 'none',
                        opacity: hasPermission('role') ? 1 : 0.5
                    }}>
                    <i class="bi bi-person-video2"></i>
                    <p class="nav-link">Role</p>
                </li>

            </ul>
        </div >
    )
}
