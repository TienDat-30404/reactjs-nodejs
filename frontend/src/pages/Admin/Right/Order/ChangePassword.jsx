import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { changePassword, getDetailUser } from '../../../../services/UserService'
export default function ChangePassword({ show, close, idUser }) {
    const [password, setPassword] = useState('')
    const [user, setUser] = useState([])
    const handleChangeInput = (e) => {
        setPassword(e.target.value)
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            const response = await getDetailUser(idUser)
            console.log(response.detailUser)
            setUser(response.detailUser)
        }
        fetchDataUser()
    }, [idUser])

    const closeModal = () => {
        close()
        setPassword('')
    }

    const handleChangePassword = async() => {
        const response = await changePassword(idUser, {password})
        if(response.message)
        {
            alert("Đổi mật khẩu thành công")
        }
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Đổi mật khẩu</p>
                    {user ? (
                        <Fragment>
                            <div className='px-4 py-2 d-flex align-items-center'>
                                <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="email"
                                        value={user.email}
                                        className={`form-control `}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='px-4 py-2 d-flex align-items-center'>
                                <label style={{ fontSize: '14px' }} className="form-label">Mật khẩu mới</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="password"
                                        value={password}
                                        onChange={handleChangeInput}
                                        className={`form-control `}
                                    />
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
