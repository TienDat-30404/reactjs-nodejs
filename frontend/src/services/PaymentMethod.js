export const getAllPaymentMethod = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-payment-method`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json();
}