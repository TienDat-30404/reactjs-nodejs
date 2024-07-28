import { setCookieForToken, useSaveTokenOnRedux } from "./tokenUser";
import Cookies from 'js-cookie'
import { loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = useSaveTokenOnRedux();

    const checkAndUpdateToken = async () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            dispatch(loginSuccess({ dataLogin: accessToken }));
        } else {
            await handleRefreshToken();
        }
    };

    const handleRefreshToken = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Để gửi cookie từ client đến server
            });

            const refreshToken = await response.json();
            console.log(refreshToken.tokenNew);
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(refreshToken.tokenNew);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { checkAndUpdateToken };
};