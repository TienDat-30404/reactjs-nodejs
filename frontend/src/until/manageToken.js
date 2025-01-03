import { setCookieForToken } from "./tokenUser";
import { useSaveTokenOnRedux } from "./function";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import { refreshTokenService } from "../services/UserService";
import { useEffect } from "react";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = useSaveTokenOnRedux();
    const accessToken = Cookies.get('accessToken');
    const checkAndUpdateToken = async () => {
        if (accessToken) {
            dispatch(loginSuccess({ dataLogin: jwtDecode(accessToken) }));
        } else {
            await handleRefreshToken();
        }
    };

    const handleRefreshToken = async () => {
        try {
            const refreshToken = await refreshTokenService()
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
                dispatch(loginSuccess({ dataLogin: jwtDecode(refreshToken.tokenNew) }));
            }

        } catch (error) {
            console.log(error);
        }
    };
  

    useEffect(() => {
        checkAndUpdateToken();
    }, []);

    return { checkAndUpdateToken };
};