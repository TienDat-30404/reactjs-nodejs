import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
import Category from './Right/CategoryByProduct/CategoryByProduct'
import { routes } from '../../routes'
const Body = ({right}) => {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className=" col-12 row ">
                    <Left />
                    {right}
                </div>
            </div>
        </div>
    )
}

export default Body
