import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct } from '../../../../services/ProductService'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateProductRedux } from '../../../../redux/Products/productsSlice'
import { updateUser } from '../../../../services/UserService'
import { use } from 'react'
import { updateUserRedux } from '../../../../redux/User/usersSlice'

export default function EditUser({ data, show, close }) {
    const dispatch = useDispatch()
    const roles = useSelector(state => state.roles.roles)
    const [selectedEdit, setSelectedEdit] = useState(true)
    const [userInformation, setUserInformation] = useState({
        userName: '',
        email: '',
        idRole: '',
        name: '',
        address: '',
        phone: '',
        date_of_birth: '',
        sex: '',
        avatar: '',
    })

    useEffect(() => {
        setUserInformation({
            userName: data?.account?.userName || '',
            email: data?.account?.email || '',
            idRole: data?.account?.role?._id || '',
            name: data?.name || '',
            address: data?.address,
            phone: data?.phone,
            date_of_birth: data?.date_of_birth,
            sex: data?.sex,
            avatar: data?.avatar
        });

    }, [show]);


    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})



    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserInformation(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
        const isValid = validateInput(name, value);
        console.log(isValid)
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            if (isValid) {
                delete newErrors[name];
            } else {
                newErrors[name] = newErrors[name]
            }

            return newErrors;
        });
    };

    const handleChangeFile = (e) => {
        const selectedFileImage = e.target.files[0]
        setImage(selectedFileImage);
        setErrors(prevError => {
            const newError = { ...prevError }
            if (selectedFileImage) {
                delete newError.image
            }
            return newError
        })
    };


    const closeModal = () => {
        close()
        setSelectedEdit(true)
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleClickUpdateUser = async () => {
        inputFocusRef.current.focus()
        console.log(userInformation)
        var formData = new FormData()
        formData.append('name', userInformation.name)
        formData.append('address', userInformation.address)
        formData.append('phone', userInformation.phone)
        formData.append('date_of_birth', userInformation.date_of_birth)
        formData.append('sex', userInformation.sex)
        formData.append('avatar', image)

        const response = await updateUser(data?._id, formData)
        if (response && response?.status === 200) {
            console.log("updateRedux")
            dispatch(updateUserRedux({
                id: data?._id,
                data: response?.newData
            }))
        }
        console.log("response107", response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        else {
            toast.success("Chỉnh sửa thành công")
        }
    }

    const validateInput = (name, value) => {
        switch (name) {
            default:
                return value.trim() !== '';
        }
    };

    const handleSelectedEdit = () => {
        setSelectedEdit(!selectedEdit)
        console.log(selectedEdit)
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                {show && data ? (
                    <div className=" modal-content">
                        <p class="d-inline-flex gap-1 mt-2 d-flex justify-content-center">
                            <button onClick={() => handleSelectedEdit()} type="button" disabled={selectedEdit} class="btn btn-primary" data-bs-toggle="button">Thông tin tài khoản</button>
                            <button onClick={() => handleSelectedEdit()} type="button" disabled={!selectedEdit} class="btn btn-primary" data-bs-toggle="button">Thông tin cá nhân</button>
                        </p>

                        {selectedEdit ? (
                            <Fragment>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Tên người dùng</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="userName"
                                            value={userInformation?.userName}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.name ? errors.name : ""}
                                        />
                                    </div>

                                </div>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="email"
                                            value={userInformation?.email}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.name ? errors.name : ""}
                                        />
                                    </div>

                                </div>


                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Hình thức đki</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="name"
                                            readOnly
                                            value={data?.account?.typeLogin}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.name ? errors.name : ""}
                                        />
                                    </div>

                                </div>



                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Quyền</label>
                                    <div style={{ width: '100%' }}>
                                        <select
                                            value={userInformation?.idRole}
                                            name="idRole"
                                            className={`form-control ${errors?.idCategory ? 'is-invalid' : ''} `}
                                            onChange={handleChangeInput}
                                        >
                                            <option value="0">Chọn quyền</option>
                                            {roles?.length > 0 ? (
                                                roles?.map((role, index) => (
                                                    <option key={index} value={role?._id}>{role?.name}</option>
                                                ))
                                            ) : <option>Hiện không có thể loại sản phẩm nào</option>}
                                        </select>
                                    </div>
                                </div>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Created At</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            readOnly
                                            name="name"
                                            value={data?.account?.createdAt}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.name ? errors.name : ""}
                                        />
                                    </div>

                                </div>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Updated At</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            readOnly
                                            name="name"
                                            value={data?.account?.updatedAt}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.name ? errors.name : ""}
                                        />
                                    </div>

                                </div>
                            </Fragment>
                        ) :
                            <Fragment>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Họ tên</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="name"
                                            value={userInformation?.name}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors?.name ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors?.name ? errors?.name : ""}
                                        />
                                    </div>

                                </div>
                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Địa chỉ</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="address"
                                            value={userInformation?.address}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors?.address ? errors?.address : ""}
                                        />
                                    </div>
                                </div>

                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Phone</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="phone"
                                            value={userInformation?.phone}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors?.phone ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors?.phone ? errors?.phone : ""}
                                        />
                                    </div>
                                </div>

                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Ngày sinh</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            type="date"
                                            name="date_of_birth"
                                            value={userInformation?.date_of_birth}
                                            onChange={handleChangeInput}
                                            className={`form-control ${errors?.date_of_birth ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                        />
                                    </div>
                                </div>

                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Giới tính</label>
                                    <div style={{ width: '100%' }}>
                                        <select
                                            value={userInformation?.sex}
                                            name="sex"
                                            className={`form-control ${errors?.sex ? 'is-invalid' : ''} `}
                                            onChange={handleChangeInput}
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='px-4 py-2 d-flex align-items-center'>
                                    <label style={{ fontSize: '14px' }} className="form-label">Avatar</label>
                                    <div style={{ width: '100%' }}>
                                        <InputComponent
                                            name="avatar"
                                            type="file"
                                            onChange={handleChangeFile}
                                            ref={inputFocusRef}
                                        />
                                        <img width="60px" height="40px" src={data?.avatar} alt="" />

                                    </div>
                                </div>
                            </Fragment>
                        }



                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClickUpdateUser} type="button" className="btn btn-primary">Edit</button>
                        </div>

                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
