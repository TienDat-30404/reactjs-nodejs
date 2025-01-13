import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin'
export default function AdminLayout({children}) {
    return (
        <div className='admin d-flex'>
            <SidebarAdmin />
            <div className='admin_right'>
                {children}
            </div>
        </div>
    )
}
