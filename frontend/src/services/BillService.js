export const addBill = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-bill`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
