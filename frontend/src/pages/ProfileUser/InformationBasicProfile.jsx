import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComponent } from '../../components/InputComponent';
import { setCookieForToken, useSaveTokenOnRedux } from '../../until/tokenUser';
import { jwtDecode } from 'jwt-decode';
import { loginService, updateUserService } from '../../services/UserService';
import { ErrorMessageInput } from '../../components/InputComponent';
export default function InformationBasicProfile() {
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({
        name: '',
        address: '',
        date_of_birth: '',
        sex: ' '
    })
    const [errors, setErrors] = useState({})
    const [dataUpdate, setDataUpdate] = useState(null);
    const saveTokenOnRedux = useSaveTokenOnRedux()
    
    const displayDefaultInformation = useCallback(() => {
        if (isAuthenticated && userData?.dataLogin) {
            const { name, address, date_of_birth, sex } = userData.dataLogin
            setDataUser({
                name,
                address,
                date_of_birth,
                sex
            })
        } else {
            setDataUser({
                name: '',
                address: '',
                date_of_birth: '',
                sex: ''
            })
        }
    }, [isAuthenticated, userData])

    useEffect(() => {
        displayDefaultInformation()
    }, [displayDefaultInformation]);

    useEffect(() => {
        if (isAuthenticated) {
            const { email, password, phone } = userData.dataLogin
            setDataUpdate({
                ...dataUser,
                email,
                password,
                phone
            })
        } else {
            setDataUpdate(null);
        }
    }, [isAuthenticated, userData, dataUser]);

    const fetchApiUpdateUser = async (id, data) => {
        try {
            const resultUpdate = await updateUserService(id, data)
            if (resultUpdate.errors) {
                setErrors(resultUpdate.errors)
                return
            }

            if (resultUpdate.message) {
                alert("Chỉnh sửa thành công")
                setErrors({})
                // window.location.reload()
            }


            const refreshTokenWhenUpdate = {
                email: userData.dataLogin.email,
                password: userData.dataLogin.password
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

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setDataUser(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    };
    return (
        <div style={{ borderRight: '1px solid #ccc' }} className='col-6 bg-white '>
            <div className=' px-3'>
                <p className='p-2' style={{ color: '#666' }}>Thông tin cá nhân</p>
                <div className='d-flex'>
                    <div style={{ border: '4px solid rgb(194, 225, 255)', width: "100px", padding: '24px', borderRadius: '70px' }}>
                        <img
                            width="45px"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt=""
                        />
                    </div>
                    <div className='ms-3 flex-grow-1'>
                        <div className='d-flex align-items-center'>
                            <p style={{ width: '85px' }} className='text-nowrap me-2'>Họ & tên</p>
                            <InputComponent
                                name='name'
                                value={dataUser.name}
                                onChange={handleChangeInput}
                                style={{ height: '35px' }}
                                type="text"
                                className={`form-control flex-grow-1 ${errors.name ? 'is-invalid' : ''}`}
                                aria-describedby="passwordHelpBlock"
                            />
                        </div>
                        {errors.name && <ErrorMessageInput errors={errors} field="name" />}
                        <div className='d-flex align-items-center mt-4'>
                            <p style={{ width: '85px' }} className='text-nowrap me-2'>Địa chỉ</p>
                            <InputComponent
                                name='address'
                                value={dataUser.address}
                                onChange={handleChangeInput}
                                style={{ height: '35px' }}
                                type="text"
                                className="form-control flex-grow-1"
                                aria-describedby="passwordHelpBlock"
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center mt-4'>
                    <p className='me-2 text-nowrap'>Ngày sinh</p>
                    <InputComponent
                        name='date_of_birth'
                        value={dataUser.date_of_birth}
                        onChange={handleChangeInput}
                        type="date"
                        className="form-control"
                    />
                </div>
                <div className='d-flex align-items-center mt-4'>
                    <p>Giới tính</p>
                    <div className="form-check ms-3">
                        <InputComponent
                            name='sex'
                            checked={dataUser.sex === 'Nam'}
                            onChange={() => setDataUser(preInfor => ({ ...preInfor, sex: 'Nam' }))}
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault1"
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Nam
                        </label>
                    </div>
                    <div className="form-check ms-5">
                        <InputComponent
                            name='sex'
                            checked={dataUser.sex === 'Nữ'}
                            onChange={() => setDataUser(prevInfor => ({ ...prevInfor, sex: 'Nữ' }))}
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault2"
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Nữ
                        </label>
                    </div>
                    <div className="form-check ms-5">
                        <InputComponent
                            name='sex'
                            checked={dataUser.sex === 'Khác'}
                            onChange={() => setDataUser(prevInfor => ({ ...prevInfor, sex: 'Khác' }))}
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault3"
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Khác
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button onClick={handleSaveChanges} type="button" className="btn btn-primary mb-5">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
}