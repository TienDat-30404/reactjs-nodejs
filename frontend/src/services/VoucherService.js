import Cookies from 'js-cookie';

export const getVoucherOfUser = async (query) => {
    try {
        const token = Cookies.get('accessToken'); 

        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-voucher-user?${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        return { error: error.message };
    }
};


export const getAllVoucher = async (query) => {
    try {
        const token = Cookies.get('accessToken'); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-voucher?${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        return { error: error.message };
    }
}

export const deleteVoucher = async (id) => {
    try {
        const token = Cookies.get('accessToken'); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-voucher/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting voucher:', error);
        return { error: error.message };
    }
}


export const editVoucher = async(id, data) => {
    try {
        const token = Cookies.get('accessToken'); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-voucher/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response.json();
    } catch (error) {
        console.error('Error editing voucher:', error);
        return { error: error.message };
    }
}