

import Cookies from 'js-cookie'
export const getAllReceipt = async (query) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-receipt?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json()
    } catch (error) {
        console.log(`Fail when get all receipt ${error}`)
    }
}

export const addReceipt = async (data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/add-supplier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    } catch (error) {
        console.log(`Fail when add supplier ${error}`)
    }
}

export const updateSupplier = async (id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-supplier/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json()
}

export const deleteSupplier = async (id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-supplier/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    return response.json()
}