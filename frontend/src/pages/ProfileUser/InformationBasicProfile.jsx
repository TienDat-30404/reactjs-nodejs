import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComponent } from '../../components/InputComponent';
import { setCookieForToken, useSaveTokenOnRedux } from '../../until/tokenUser';
import { jwtDecode } from 'jwt-decode';
import { loginService, updateUserService } from '../../services/UserService';
export default function InformationBasicProfile() {
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [datasUpdate, setDatasUpdate] = useState({
        name: '',
        address: '',
        date_of_birth: '',
        sex: ' '
    })
    const [data, setData] = useState(null);
    const saveTokenOnRedux = useSaveTokenOnRedux()

    const displayDefaultInformation = useCallback(() => {
        if (isAuthenticated && userData?.dataLogin) {
            const {name, address, date_of_birth, sex} = userData.dataLogin
            setDatasUpdate({
                name,
                address,
                date_of_birth,
                sex
            })
        } else {
            setDatasUpdate({
                name : '',
                address : '',
                date_of_birth : '',
                sex : ''
            })
        }
    }, [isAuthenticated, userData])

    useEffect(() => {
        displayDefaultInformation()
    }, [displayDefaultInformation]);

    useEffect(() => {
        if (isAuthenticated) {
            const {email , password, phone} = userData.dataLogin
            setData({
                ...datasUpdate,
                email,
                password,
                phone
            })
        } else {
            setData(null);
        }
    }, [isAuthenticated, userData, datasUpdate]);

    const fetchApiUpdateUser = async (id, data) => {
        try {
            const resultUpdate = await updateUserService(id, data)
            console.log(resultUpdate)
            const refreshTokenWhenUpdate = {
                email: userData.dataLogin.email,
                password: userData.dataLogin.password
            }

            if (resultUpdate.message) {
                console.log('Cập nhật thành công:', resultUpdate);
                alert("Chỉnh sửa thành công")
                // window.location.reload()
            } else {
                console.log('Lỗi khi cập nhật:', resultUpdate);
            }
            
            const resultTokenUpdate = await loginService(refreshTokenWhenUpdate)
            console.log(resultTokenUpdate.token)
            setCookieForToken(resultTokenUpdate.token)
            saveTokenOnRedux(jwtDecode(resultTokenUpdate.token))
        } catch (error) {
            console.log('Có lỗi xảy ra:', error);
        }
    };

    const handleSaveChanges = () => {
        if (data) {
            fetchApiUpdateUser(userData.dataLogin.idUser, data);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setDatasUpdate(prevInfor => ({
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
                                name = 'name'
                                value={datasUpdate.name}
                                onChange={handleChangeInput}
                                style={{ height: '35px' }}
                                type="text"
                                className="form-control flex-grow-1"
                                aria-describedby="passwordHelpBlock"
                            />
                        </div>
                        <div className='d-flex align-items-center mt-4'>
                            <p style={{ width: '85px' }} className='text-nowrap me-2'>Địa chỉ</p>
                            <InputComponent
                                name = 'address'
                                value={datasUpdate.address}
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
                        name = 'date_of_birth'
                        value={datasUpdate.date_of_birth}
                        onChange={handleChangeInput}
                        type="date"
                        className="form-control"
                    />
                </div>
                <div className='d-flex align-items-center mt-4'>
                    <p>Giới tính</p>
                    <div className="form-check ms-3">
                        <InputComponent
                            name = 'sex'
                            checked={datasUpdate.sex === 'Nam'}
                            onChange={() => setDatasUpdate(preInfor => ({...preInfor, sex : 'Nam'}))}
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
                            name = 'sex'
                            checked={datasUpdate.sex === 'Nữ'}
                            onChange={() => setDatasUpdate(prevInfor => ({...prevInfor, sex : 'Nữ'}))}
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
                            name = 'sex'
                            checked={datasUpdate.sex === 'Khác'}
                            onChange={() => setDatasUpdate(prevInfor => ({...prevInfor, sex : 'Khác'}))}
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