import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { changePassword, getDetailUser } from '../../../../services/UserService'
import { toast } from 'react-toastify'
export default function ChangePassword({ show, close, data }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const closeModal = () => {
        close()
        setPassword('')
        setPassword('')
    }

    const handleChangePassword = async () => {
        if(password === "")
        {
            setError({
                password : "Mật khẩu không được để trống"
            })
            return
        }
        else {
            if (password.length < 6) {
            setError({
                password : "Mật khẩu phải lớn 6 kí tự"
            })
            return
        }
        }
        const response = await changePassword(data?.account?._id, { password })
        if (response && response.status === 200) {
            toast.success("Đổi mật khẩu thành công")
            setError({})
        }
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Đổi mật khẩu</p>
                    {show ? (
                        <Fragment>
                            <div className='px-4 py-2 d-flex align-items-center'>
                                <label style={{ fontSize: '14px' }} className="form-label">Id Account</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        value={data?.account?._id}
                                        className={`form-control `}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='px-4 py-2 d-flex align-items-center'>
                                <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="email"
                                        value={data?.account?.email}
                                        className={`form-control `}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='px-4 py-2 d-flex align-items-center'>
                                <label style={{ fontSize: '14px' }} className="form-label">Mật khẩu mới</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`form-control ${Object.keys(error).length > 0 ? 'is-invalid' : ''} `}
                                    />
                                    {error && <ErrorMessageInput errors={error} field="password" />}

                                </div>
                            </div>
                        </Fragment>
                    ) : <p>123</p>}


                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={() => handleChangePassword()} type="button" className="btn btn-primary">Đổi mật khẩu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
