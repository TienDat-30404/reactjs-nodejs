export const getAllProduct = async (page, idProduct, type, limit = null, idCategory = null, search = null) => {
    const params = new URLSearchParams({
        page,
        soryBy: idProduct,
        type,
    });
    if (limit) {
        params.append('limit', limit);
    }
    if(search)
    {
        params.append('search', search)
    }
    console.log(params.toString())
    if (idCategory) {
        params.append('idCategory', idCategory);
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

export const getDetailProduct = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}   

export const searchProduct = async(word) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search?type=${word}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}