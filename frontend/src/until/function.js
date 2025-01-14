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
        if (element) {
            scrollPosition = element.scrollTop + element.clientHeight;
            bottomPosition = element.scrollHeight;
        }
        else {
            scrollPosition = window.scrollY + window.innerHeight;
            bottomPosition = document.documentElement.scrollHeight;
        }
        if (scrollPosition >= bottomPosition * 0.95 && limit < total) {
            dispatch(func());
        }
    }, []);
    return loadMoreData
}


export const validateInformationPayment = (data) => {
    const errors = {}
    const phoneRegex = /^09\d{8,9}$/;
    if (data.phone == "") {
        errors.phone = "Số điện thoại không được để trống";
    }
    if (data.address == "") {
        errors.address = "Địa chỉ không được để trống"
    }
    if (!phoneRegex.test(data.phone) && data.phone != "") {
        errors.phone = "Số điện thoại không hợp lệ";
    }
    return errors
}

export const visiblePagination = (page, totalPage) => {
    const pages = []


    if (page == 1 && totalPage >= 3) {
        pages.push(page)
        pages.push(page + 1)
        pages.push(page + 2)
    }
    else if (page == totalPage && totalPage > 3) {
        pages.push(page - 2)
        pages.push(page - 1)
        pages.push(page)
    }

    else {
        if (page > 1) {
            pages.push(page - 1)
        }
        pages.push(page)
        if (page < totalPage) {
            pages.push(page + 1)
        }
    }
    return pages
}