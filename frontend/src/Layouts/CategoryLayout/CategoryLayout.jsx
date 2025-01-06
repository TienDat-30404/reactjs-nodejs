import React from 'react'
import Header from '../components/Header/Header'
import Left from '../../pages/Content/Left/Left'
import Category from '../../pages/Content/Right/CategoryByProduct/CategoryByProduct'
export default function CategoryLayout({ children }) {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className=" col-12 row ">
                    <Header />
                    <div className=" col-12 row ">
                        <Left />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
