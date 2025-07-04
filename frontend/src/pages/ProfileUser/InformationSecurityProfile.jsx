import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { InputComponent, ErrorMessageInput } from '../../components/InputComponent'
import { updateUser, loginService } from '../../services/UserService';
import { setCookieForToken } from '../../until/tokenUser';
import { useSaveTokenOnRedux } from '../../until/function';
import { jwtDecode } from 'jwt-decode';
import UpdatePassword from './UpdatePassword';
import { toast } from 'react-toastify';
export default function InformationSecurityProfile() {
    const saveTokenOnRedux = useSaveTokenOnRedux()
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({
        email: '',
    })

    const [showModal, setShowModal] = useState(false)
    const handleDisplayUpdatePassword = () => {
        setShowModal(true)
    }
    const handleCloseUpdatePassword = () => {
        setShowModal(false)
    }

    const [dataUpdate, setDataUpdate] = useState(null)
    const [errors, setErrors] = useState({})
    const displayDefaultInformation = useCallback(() => {
        if (isAuthenticated && userData?.dataLogin) {
            const { email} = userData.dataLogin
            setDataUser({
                email,
            })
        } else {
            setDataUser({
                email: '',
            })
        }
    }, [isAuthenticated, userData])

    useEffect(() => {
        displayDefaultInformation()
    }, [displayDefaultInformation])

    useEffect(() => {
        if (isAuthenticated) {
            const { name, address, date_of_birth, sex } = userData.dataLogin
            setDataUpdate({
                ...dataUser,
                name,
                address,
                date_of_birth,
                sex
            })
        } else {
            setDataUpdate(null);
        }
    }, [isAuthenticated, userData, dataUser]);

    const fetchApiUpdateUser = async (id, data) => {
        try {
            const resultUpdate = await updateUser(id, data)
            if (resultUpdate.errors) {
                setErrors(resultUpdate.errors)
                return
            }

            if (resultUpdate.message) {
                toast.success("Chỉnh sửa thành công")
                setErrors({})
                // window.location.reload()
            }

            const refreshTokenWhenUpdate = {
                email: dataUser.email,
            }
            const resultTokenUpdate = await loginService(refreshTokenWhenUpdate)
            setCookieForToken(resultTokenUpdate.token)
            saveTokenOnRedux(jwtDecode(resultTokenUpdate.token))
        } catch (error) {
            console.log('Có lỗi xảy ra:', error);
        }
    };

    const handleSaveChanges = () => {
        if (dataUpdate) {
            const formData = new FormData()
            formData.append('email', dataUpdate.email)
            fetchApiUpdateUser(userData.dataLogin.idUser, formData);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setDataUser(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    };
    return (
        <div className='col-6 bg-white py-2 '>
            
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-envelope me-2"></i>
                    <div>
                        <p className='mb-1'>Địa chỉ email</p>
                        <InputComponent
                            name='email'
                            value={dataUser.email}
                            onChange={handleChangeInput}
                            style={{ height: '30px' }}
                            type="text"
                            className={`form-control flex-grow-1 ${errors.email ? 'is-invalid' : ''}`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {errors.email && <ErrorMessageInput errors={errors} field="email" />}
                    </div>

                </div>
                <button onClick={handleSaveChanges} style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <p className='mt-4' style={{ color: '#777' }}>Bảo mật</p>
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-envelope me-2"></i>
                    <p className='me-2'>Đổi mật khẩu</p>
                    <UpdatePassword show = {showModal} closeModal = {handleCloseUpdatePassword} />
                </div>
                <button onClick={handleDisplayUpdatePassword} style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-shield-check me-2"></i>
                    <p>Thiết lập mã pin</p>
                </div>
                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <div className='d-flex'>
                    <i className="bi bi-trash me-2"></i>
                    <p>Yêu cầu xóa tài khoản</p>
                </div>
                <button style={{ color: 'blue' }} className='btn border-primary'>Cập nhật</button>
            </div>
            <p className='mt-4' style={{ color: '#777' }}>Liên kết mạng xã hội</p>
        </div>
    )
}
