export const getAllRole = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-role`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addRole = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-role`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return response.json()
}

export const getDetailRole = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-role/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}