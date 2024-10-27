export const GetDetailMessage = async(idUser) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-detail-message?idUser=${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json();
}

export const AddMessage = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json();
}

