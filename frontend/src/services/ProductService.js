export const getAllProduct = async (page, sort='idProduct', type='asc', limit = null, idCategory = null, search = null, priceFrom = null, priceTo = null) => {
    const params = new URLSearchParams({
        page,
        sortBy: sort || 'idProduct',
        type : type || 'asc'
    });
    if (limit) {
        params.append('limit', limit);
    }
    if (search) {
        params.append('search', search)
    }
    if (idCategory) {
        params.append('idCategory', idCategory);
    }
    if (priceFrom) {
        params.append('priceFrom', priceFrom)
    }
    if (priceTo) {
        params.append('priceTo', priceTo)
    }
    const url = `${process.env.REACT_APP_API_URL}/get-all-product?${params.toString()}`;
    console.log(url)
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

export const searchProduct = async (word) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search?type=${word}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}