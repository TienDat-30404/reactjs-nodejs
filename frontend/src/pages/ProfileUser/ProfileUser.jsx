import React from 'react'
import MenuProfile from './MenuProfile'
import InformationGeneralProfile from './InformationGeneralProfile'
export default function ProfileUser() {
    return (
        <div className="" >
            <div className="container d-flex">
                <div className="row col-12 mt-2">
                    <MenuProfile />
                    <InformationGeneralProfile />
                </div>
            </div>
        </div>
    )
}
