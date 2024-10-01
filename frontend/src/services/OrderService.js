export const addOrder = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const getAllOrder = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json();
}

export const detailOrder = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-order/${id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
        }
    })
    return response.json();
}

export const confirmOrder = async(id, data) => {
    const url = `${process.env.REACT_APP_API_URL}/confirm-order/${id}`
    console.log(url)
    const response = await fetch(url, {
        method : 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json();
}