import { setCookieForToken, useSaveTokenOnRedux, useSaveCartOnRedux } from "./tokenUser";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { refreshTokenService } from "../services/UserService";
import { allCartOfUser } from "../services/CartService";
import { useState, useEffect } from "react";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState(null)
    const saveTokenOnRedux = useSaveTokenOnRedux();
    const saveCartOnRedux = useSaveCartOnRedux();
    const accessToken = Cookies.get('accessToken');
    const checkAndUpdateToken = async () => {
        let currentIdUser = idUser
        if (accessToken) {
            dispatch(loginSuccess({ dataLogin: jwtDecode(accessToken) }));
            setIdUser(jwtDecode(accessToken).idUser)
        } else {
            // saveTokenOnCookieAfterDeleted(10000);
            await handleRefreshToken();
        }
        if (currentIdUser) {
            await fetchAllCart(idUser)
        }
    };

    useEffect(() => {
        checkAndUpdateToken();
    }, []);

    const handleRefreshToken = async () => {
        try {
            const refreshToken = await refreshTokenService()
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
                setIdUser(jwtDecode(refreshToken.tokenNew).idUser)
                // saveTokenOnCookieAfterDeleted(10000);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // const saveTokenOnCookieAfterDeleted = (delay) => {
    //     setTimeout(async () => {
    //         await handleRefreshToken();
    //     }, delay);
    // };


    const fetchAllCart = async (id) => {
        const response = await allCartOfUser(id);
        saveCartOnRedux(response.carts, response.carts.length);
    }

    return { checkAndUpdateToken };
};