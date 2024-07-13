import React from 'react'
import Category from './Category'
import Utilities from './Utilities'
import '../../../public/css/left.css'
const Left = () => {
    return (
        <div className= "col-2-5">
            <Category />
            <Utilities />
        </div>
    )
}

export default Left
