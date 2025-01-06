import React from 'react'
import Header from '../components/Header/Header'
import MenuProfile from '../../pages/ProfileUser/MenuProfile'
import { ToastContainer } from 'react-toastify'
export default function ProfileLayout({ children }) {
    return (
        <div>

            <Header />
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
                    {children}
                </div>
            </div>
        </div>
    )
}
