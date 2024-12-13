import React from 'react'
import Left from './Left/Left'
import { ToastContainer } from 'react-toastify'
const Body = ({ right }) => {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className=" col-12 row ">
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

                    <Left />
                    {right}
                </div>
            </div>
        </div>
    )
}

export default Body
