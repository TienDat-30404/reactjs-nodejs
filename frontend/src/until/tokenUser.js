import Cookies from 'js-cookie';
import { loginSuccess, setCartRedux } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const setCookieForToken = (token) => {
    const timeExistTokenCookie = new Date(new Date().getTime() + 10 * 1000);
    Cookies.set('accessToken', token, { expires: timeExistTokenCookie, secure: true, sameSite: 'strict' });
}

const useSaveTokenOnRedux = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = (dataLogin) => {
        dispatch(loginSuccess({
            dataLogin : dataLogin
        }));
    };
    return saveTokenOnRedux;
};

const useSaveCartOnRedux = () => { // tên đặt phải bắt buộc phải viết use đầu hoặc ghi hoa
    const dispatch = useDispatch();
    const saveCartOnRedux = (carts, length) => {
        dispatch(setCartRedux({
            dataCart : carts,
            length : length
        }))
    }
    return saveCartOnRedux
}


const logoutUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/logout-refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Để gửi cookie từ client đến server
    })
    Cookies.remove('accessToken', { path: '' });
    localStorage.removeItem('avatar')
}

export { setCookieForToken, useSaveTokenOnRedux, logoutUser, useSaveCartOnRedux }