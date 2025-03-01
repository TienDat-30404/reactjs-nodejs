export const getAllRole = async (query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-role?${query}`, {
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
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}



export const updateRole = async (id, data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/update-role/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }
    catch (err) {
        console.log("Fail when update role", err)
    }
}

export const deleteRole = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-role/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }
    catch (err) {
        console.log("Fail when delete role", err)
    }
}

export const getDetailRole = async(id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/permissions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }
    catch (err) {
        console.log("Fail when get permissions", err)
    }
}