import React from 'react'
import { useState, useEffect } from 'react'
import { InputComponent, ErrorMessageInput } from '../../components/InputComponent';
import { useSelector } from 'react-redux';
import { updateUserService, loginService } from '../../services/UserService';
import { setCookieForToken, useSaveTokenOnRedux } from '../../until/tokenUser';
import { jwtDecode } from 'jwt-decode';
// import bcrypt from 'bcrypt'
export default function UpdatePassword({ show, closeModal }) {
    const saveTokenOnRedux = useSaveTokenOnRedux()
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [dataUpdate, setDataUpdate] = useState(null)
    const [errors, setErrors] = useState({})
    const [dataPassword, setDataPassword] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    })

    const handleCloseModal = () => {
        setDataPassword({
            oldPassword : '',
            password : '',
            confirmPassword : ''
        })
        closeModal()
        setErrors({})
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setDataPassword(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            const { name, email, address, phone, sex } = userData.dataLogin
            setDataUpdate({
                name,
                email,
                address,
                phone,
                sex,
                oldPassword: dataPassword.oldPassword,
                password: dataPassword.password,
                confirmPassword: dataPassword.confirmPassword,
            })
        } else {
            setDataUpdate(null);
        }
    }, [isAuthenticated, userData, dataPassword.oldPassword, dataPassword.password, dataPassword.confirmPassword]);

    const fetchApiUpdateUser = async (id, data) => {
        try {
            const resultUpdate = await updateUserService(id, data)
            console.log(resultUpdate)
            if (resultUpdate.errors) {
                setErrors(resultUpdate.errors)
                return
            }
            if (resultUpdate.message) {
                alert("Chỉnh sửa thành công")
                setErrors({})
            }
            const refreshTokenWhenUpdate = {
                email: userData.dataLogin.email,
                password: dataPassword.password
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
            fetchApiUpdateUser(userData.dataLogin.idUser, dataUpdate);
        }
    };
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog update-user">
                <div className="modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Đổi mật khẩu</p>
                    <div className='px-4 py-2'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Mật khẩu hiện tại</label>
                        <InputComponent
                            name="oldPassword"
                            value={dataPassword.oldPassword}
                            onChange={handleChangeInput}
                            type="password"
                            id="inputPassword5"
                            className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {errors.oldPassword && <ErrorMessageInput errors={errors} field="oldPassword" />}

                    </div>
                    <div className='px-4 py-2'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Mật khẩu mới</label>
                        <InputComponent
                            name="password"
                            value={dataPassword.password}
                            onChange={handleChangeInput}
                            type="password"
                            id="inputPassword5"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {errors.password && <ErrorMessageInput errors={errors} field="password" />}

                        <p style={{ fontSize: '12px' }} className="form-text"> Mật khẩu chứa ít nhất 6 kí tự</p>
                    </div>
                    <div className='px-4 py-2'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Xác nhận mật khẩu</label>
                        <InputComponent
                            name="confirmPassword"
                            value={dataPassword.confirmPassword}
                            onChange={handleChangeInput}
                            type="password"
                            id="inputPassword5"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {errors.confirmPassword && <ErrorMessageInput errors={errors} field="confirmPassword" />}
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSaveChanges} type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
