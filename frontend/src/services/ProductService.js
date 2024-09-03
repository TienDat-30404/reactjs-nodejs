
import Cookies from 'js-cookie';
export const getAllProduct = async (page = null, sortBy = 'idProduct', type = 'asc', limit = null, idCategory = null, search = null, priceFrom = null, priceTo = null) => {
    const params = new URLSearchParams({
        page: page || null,
        sortBy: sortBy || 'idProduct',
        type: type || 'asc'
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

export const addProduct = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-product`, {
        method: 'POST',
        body: data
    })
    return response.json()
}

export const deleteProduct = async (id) => {
    const token = Cookies.get('accessToken')
    console.log(token)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    })
    return response.json()
}

