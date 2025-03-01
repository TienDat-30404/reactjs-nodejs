import Cookies from 'js-cookie'
export const addOrder = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const getAllOrder = async (query) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders?${query}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return response.json();
}

export const detailOrder = async (id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-order/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    return response.json();
}

export const confirmOrder = async (id, data) => {
    const token = Cookies.get('accessToken')
    const url = `${process.env.REACT_APP_API_URL}/confirm-order/${id}`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}