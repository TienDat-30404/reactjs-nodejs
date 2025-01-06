import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComponent } from '../../components/InputComponent';
import { setCookieForToken } from '../../until/tokenUser';
import { useSaveTokenOnRedux } from '../../until/function';
import { jwtDecode } from 'jwt-decode';
import { loginService, updateUser } from '../../services/UserService';
import { ErrorMessageInput } from '../../components/InputComponent';
import { ToastContainer, toast } from 'react-toastify';
export default function InformationBasicProfile() {
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [dataUser, setDataUser] = useState({
        name: '',
        address: '',
        phone: '',
        date_of_birth: '',
        sex: '',
        avatar: '',
    })
    const [errors, setErrors] = useState({})
    const [dataUpdate, setDataUpdate] = useState(null);
    const saveTokenOnRedux = useSaveTokenOnRedux()
    const [avatar, setAvatar] = useState(null);

    // display default information user 
    const displayDefaultInformation = useCallback(() => {
        if (isAuthenticated && userData?.dataLogin) {
            const { name, address, phone, date_of_birth, sex, avatar } = userData.dataLogin
            setDataUser({
                name,
                address,
                phone,
                date_of_birth,
                sex,
                avatar
            })
        } else {
            setDataUser({
                name: '',
                address: '',
                phone: '',
                date_of_birth: '',
                sex: '',
                avatar: ''
            })
        }
    }, [isAuthenticated, userData])


    useEffect(() => {
        displayDefaultInformation()
    }, [displayDefaultInformation]);

    useEffect(() => {
        if (isAuthenticated) {
            const { email } = userData.dataLogin
            setDataUpdate({
                ...dataUser,
                email
            })
        } else {
            setDataUpdate(null);
        }
    }, [isAuthenticated, userData, dataUser]);

    const fetchApiUpdateUser = async (id, data) => {
        try {
            const resultUpdate = await updateUser(id, data)
            console.log(resultUpdate)
            if (resultUpdate.errors) {
                setErrors(resultUpdate.errors)
                return
            }

            if (resultUpdate.message) {
                toast.success("Chỉnh sửa thành công")
               
                const resultTokenUpdate = await loginService({
                    userName: userData.dataLogin.userName
                })

                setCookieForToken(resultTokenUpdate.token)
                saveTokenOnRedux(jwtDecode(resultTokenUpdate.token))
                setErrors({})
            }

        } catch (error) {
            console.log('Có lỗi xảy ra khi cập nhật profile: ', error);
        }
    };

    const handleSaveChanges = async () => {
        if (dataUpdate && userData.dataLogin.idUser) {
            var formData = new FormData()
            formData.append('name', dataUpdate.name)
            formData.append('address', dataUpdate.address)
            formData.append('phone', dataUpdate.phone)
            formData.append('date_of_birth', dataUpdate.date_of_birth)
            formData.append('sex', dataUpdate.sex)
            formData.append('avatar', avatar)
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

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64Image = reader.result;
    //             setDataUser(prevInfor => ({
    //                 ...prevInfor,
    //                 avatar: reader.result
    //             }));
    //             localStorage.setItem('avatar', base64Image); // Lưu ảnh mới vào localStorage
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleChangeFile = (e) => {
        const selectedFileImage = e.target.files[0]
        setAvatar(selectedFileImage);
        setErrors(prevError => {
            const newError = { ...prevError }
            if (selectedFileImage) {
                delete newError.image
            }
            return newError
        })
    };
    return (
        <div style={{ borderRight: '1px solid #ccc' }} className='col-6 bg-white '>
            <div className=' px-3'>
                <p className='p-2' style={{ color: '#666' }}>Thông tin cá nhân</p>
                <div className='d-flex'>
                    <div style={{ border: '4px solid rgb(194, 225, 255)', width: "100px", padding: '24px', borderRadius: '70px' }}>
                        <img
                            width="45px"
                            src={userData ? userData.dataLogin.avatar : "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"} alt=""
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
                            />
                        </div>
                    </div>
                </div>

                <InputComponent
                    name="avatar"
                    onChange={handleChangeFile}
                    className='mt-3'
                    type="file"
                />

                <div className='d-flex align-items-center mt-4'>
                    <p className='me-2 text-nowrap'>Ngày sinh</p>
                    <InputComponent
                        name='date_of_birth'
                        value={dataUser.date_of_birth}
                        onChange={handleChangeInput}
                        type="date"
                        className={`form-control flex-grow-1 ${errors.date_of_birth ? 'is-invalid' : ''}`}
                    />
                </div>
                <div className='d-flex align-items-center mt-4'>
                    <p style={{ width: '85px' }} className='text-nowrap me-2'>Điện thoại</p>
                    <InputComponent
                        name='phone'
                        value={dataUser.phone}
                        onChange={handleChangeInput}
                        style={{ height: '35px' }}
                        type="text"
                        className="form-control flex-grow-1"
                    />
                </div>
                {errors.date_of_birth && <ErrorMessageInput errors={errors} field="date_of_birth" />}
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