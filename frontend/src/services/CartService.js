export const addCart = async (idUser) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idUser)
    })
    return response.json()
}

export const getAllCart = async(idUser, page, sortBy='idCart', type='asc') => {
    const params = new URLSearchParams({
        idUser,
        page,
        sortBy : sortBy || 'idCart',
        type : type || 'asc'
    })
    const url = `${process.env.REACT_APP_API_URL}/get-all-cart?${params.toString()}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}