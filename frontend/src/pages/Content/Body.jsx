import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
import Login from '../Login/Login'
const Body = () => {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className=" col-12 row ">
                    <Left />
                    <Right />
                </div>
                <Login />
            </div>
        </div>
    )
}

export default Body
