import React from 'react'
import InformationBasicProfile from './InformationBasicProfile'
import InformationSecurityProfile from './InformationSecurityProfile'
import UpdatePassword from './UpdatePassword'
export default function InformationGeneralProfile() {
    return (
        <div className='col-9 row'>
            <div className='col-12'>
                <p style={{ fontSize: '20px', marginBottom: '16px' }} className="text-capitalize">Thông tin tài khoản</p>
            </div>
            <InformationBasicProfile />
            <InformationSecurityProfile />

        </div>
    )
}
