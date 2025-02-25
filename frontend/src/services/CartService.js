export const addCart = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// lấy sp có phân trang
export const getAllCart = async(query) => {
   
    const url = `${process.env.REACT_APP_API_URL}/get-all-cart?${query}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}


export const deleteCart = async(idCart) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-cart/${idCart}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const updateQuantityCart = async(idCart, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-quantity-cart/${idCart}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

// lấy sp ko phân trang
export const allCartOfUser = async(idUser) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-cart-no-paginated/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}