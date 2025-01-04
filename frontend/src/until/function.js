import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Auth/authSlice";
import dayjs from 'dayjs';
import { useCallback } from "react";
export const handleChangeInput = (e, setState) => {
    const { name, value } = e.target;
    setState(prevInfo => ({
        ...prevInfo,
        [name]: value
    }));

};

export const useSaveTokenOnRedux = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = (dataLogin) => {
        dispatch(loginSuccess({
            dataLogin: dataLogin
        }));
    };
    return saveTokenOnRedux;
};


export const formatTime = (createdAt) => {
    const now = dayjs();
    const diffMinutes = now.diff(dayjs(createdAt), 'minute');
    const diffHours = now.diff(dayjs(createdAt), 'hour');
    const diffDays = now.diff(dayjs(createdAt), 'day');

    if (diffMinutes < 1) return "Vừa xong";
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
};



export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const useLoadMoreData = () => {
    const loadMoreData = useCallback((limit, total, func, dispatch, element) => {
        let scrollPosition; 
        let bottomPosition
        if(element)
        {
            scrollPosition = element.scrollTop + element.clientHeight;
            bottomPosition = element.scrollHeight;
        }
        else 
        {
            scrollPosition = window.scrollY + window.innerHeight;
            bottomPosition = document.documentElement.scrollHeight;
        }
        if (scrollPosition >= bottomPosition * 0.95 && limit < total) {
            dispatch(func());
        }
    }, []);
    return loadMoreData
}
