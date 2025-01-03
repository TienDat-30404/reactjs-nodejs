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
