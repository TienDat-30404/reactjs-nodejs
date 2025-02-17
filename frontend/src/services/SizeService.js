export const getAllSizeService = async(query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sizes?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addSizeService = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-size`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const updateSizeService = async (id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-size/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteSizeService = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-size/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}