import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
const Body = () => {
    return (
        <div className='mt-3'>
            <div className="container d-flex">
                <div className="row col-12">
                    <Left />
                    <Right />
                </div>
            </div>
        </div>
  )
}

export default Body
