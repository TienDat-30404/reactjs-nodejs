export const getAllProduct = async(page, idProduct, type, limit = null) => {
    const params = new URLSearchParams({
        page,
        soryBy: idProduct,
        type,
    });
    if (limit) {
        params.append('limit', limit);
    }
    const url = `${process.env.REACT_APP_API_URL}/get-all-product?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}