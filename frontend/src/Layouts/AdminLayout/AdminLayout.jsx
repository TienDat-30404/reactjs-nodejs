import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin'
import { toast, ToastContainer } from 'react-toastify';
export default function AdminLayout({ children }) {
    return (
        <div className='admin d-flex'>
            <SidebarAdmin />
            <div className='admin_right'>
                {children}
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
}
