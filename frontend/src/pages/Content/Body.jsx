import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
const Body = () => {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className=" col-12 row ">
                    <Left />
                    <Right />
                </div>
            </div>
        </div>
  )
}

export default Body
