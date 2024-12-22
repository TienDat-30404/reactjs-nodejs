
import Cookies from 'js-cookie';
export const getAllProduct = async (query) => {
    
    const url = `${process.env.REACT_APP_API_URL}/get-all-product?${query}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export const getDetailProduct = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addProduct = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-product`, {
        method: 'POST',
        body: data
    })
    return response.json()
}

export const deleteProduct = async (id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    })
    return response.json()
}


export const updateProduct = async(id, data) => {
    // const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-product/${id}`, {
        method: 'PUT',
        body : data
    })
    return response.json()
}
