import React from 'react'

export default function ImageComponent({ src, className, width, height,borderRadius, ...rest }) {
    const styles = {
        width : width,
        height : height,
        borderRadius : borderRadius
    }
    return (
        <img
            src={src}
            className={className}
            style={styles}
        />
    )
}
