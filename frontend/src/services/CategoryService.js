export const getAllCategory = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}
