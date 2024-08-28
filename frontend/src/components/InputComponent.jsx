import React, { forwardRef } from 'react'

const InputComponent = forwardRef(({ className, type, placeholder, ...rest }, ref) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            {...rest}
            ref={ref}
        />
    )
})

const ErrorMessageInput = ({errors, field}) => {
    return(
        <p style={{ color: 'red', fontSize: '13px' }}>{errors[field]}</p>
    )    
}
export {InputComponent, ErrorMessageInput}
