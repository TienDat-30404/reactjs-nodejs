import { setCookieForToken, useSaveTokenOnRedux, useSaveCartOnRedux } from "./tokenUser";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { refreshTokenService } from "../services/UserService";
import { allCartOfUser } from "../services/CartService";
import { useState } from "react";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState(1)
    const saveTokenOnRedux = useSaveTokenOnRedux();
    const saveCartOnRedux = useSaveCartOnRedux();
    const checkAndUpdateToken = async () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            dispatch(loginSuccess({ dataLogin: jwtDecode(accessToken) }));
            setIdUser(jwtDecode(accessToken).idUser)
        } else {
            await handleRefreshToken();
        }
        await fetchAllCart(idUser)
    };

    const handleRefreshToken = async () => {
        try {
            const refreshToken = await refreshTokenService()
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
                setIdUser(jwtDecode(refreshToken.tokenNew).idUser)
            }


        } catch (error) {
            console.log(error);
        }
    };
    const fetchAllCart = async (id) => {

            const response = await allCartOfUser(id);
            saveCartOnRedux(response.carts, response.carts.length);
    }

    return { checkAndUpdateToken };
};