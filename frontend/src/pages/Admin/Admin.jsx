import React from 'react'
import Left from './Left/Left'
export default function Admin({right}) {
    return (
        <div className='admin d-flex'>
            <Left />
            <div className='admin_right'>
                {right}
            </div>
        </div>
    )
}
