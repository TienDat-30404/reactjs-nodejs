import React from 'react'
import { useState, useEffect } from 'react'
import { InputComponent, ErrorMessageInput } from '../../components/InputComponent';
import { useSelector } from 'react-redux';
import { useSaveTokenOnRedux } from '../../until/function';
import { changePassword } from '../../services/UserService';
import { toast } from 'react-toastify';
// import bcrypt from 'bcrypt'
export default function UpdatePassword({ show, closeModal }) {
    const saveTokenOnRedux = useSaveTokenOnRedux()
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [errors, setErrors] = useState({})
    const [dataPassword, setDataPassword] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    })

    const handleCloseModal = () => {
        setDataPassword({
            oldPassword: '',
            password: '',
            confirmPassword: ''
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

    const handleSaveChanges = async () => {

        if (userData && isAuthenticated) {
            const response = await changePassword(userData.dataLogin.idAccount,
            {
                email: userData.dataLogin.email,
                oldPassword: dataPassword.oldPassword,
                password: dataPassword.password,
                confirmPassword: dataPassword.confirmPassword
            }, true)
            console.log(response)
            if(response.errors)
            {
                setErrors(response.errors)
                return
            }
            else 
            {
                setErrors({})
                toast.success("Thay đổi mật khẩu thành công")
            }
        }
    };
    console.log(errors)
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog update-user">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Đổi mật khẩu</p>
                    <div className='px-4 py-2'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Mật khẩu hiện tại</label>
                        <InputComponent
                            name="oldPassword"
                            value={dataPassword.oldPassword}
                            onChange={handleChangeInput}
                            type="oldPassword"
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
