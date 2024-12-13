import React from 'react'
import MenuProfile from './MenuProfile'
import InformationGeneralProfile from './InformationGeneralProfile'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
export default function ProfileUser() {

    return (
        <div className="container d-flex">
            <div className="row col-12 mt-2">
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

                <MenuProfile />
                <InformationGeneralProfile />
            </div>
        </div>
    )
}
