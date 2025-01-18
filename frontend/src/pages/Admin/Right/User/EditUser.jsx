import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct } from '../../../../services/ProductService'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateProductRedux } from '../../../../redux/Products/productsSlice'

export default function EditUser({ data, show, close }) {
    const dispatch = useDispatch()
    const roles = useSelector(state => state.roles.roles)
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
            name: data?.account?.userName || '',
            email: data?.account?.email || '',
            idRole: data?.account?.role?._id || '',
            name: data?.name,
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
        // setUserInformation({
        //     name: '',
        //     idCategory: 0,
        //     description: ''
        // })
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleClickUpdateProduct = async () => {
        // inputFocusRef.current.focus()
        // var formData = new FormData()
        // formData.append('name', product.name)
        // formData.append('image', image)
        // formData.append('description', product.description)
        // formData.append('idCategory', product.idCategory)
        // selectedOptions?.length > 0 ? selectedOptions?.map((size) => {
        //     formData.append('sizes[]', size.value)
        // }) : formData.append('sizes[]', [])

        // const response = await updateProduct(data?._id, formData)
        // if (response && response?.status === 200) {
        //     console.log(response.product)
        //     dispatch(updateProductRedux({
        //         id: data?._id,
        //         newData: response?.product
        //     }))
        // }
        // console.log("response107", response)
        // if (response.errors) {
        //     setErrors(response.errors)
        //     return
        // }
        // else {
        //     toast.success("Chỉnh sửa thành công")
        // }
    }

    const validateInput = (name, value) => {
        switch (name) {
            default:
                return value.trim() !== '';
        }
    };
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                {show && data ? (
                    <div className=" modal-content">
                        {/* <p class="d-inline-flex gap-1 mt-2 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" data-bs-toggle="button">Thông tin tài khoản</button>
                            <button type="button" class="btn btn-primary" disabled data-bs-toggle="button">Thông tin cá nhân</button>
                        </p>
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
                                    name="name"
                                    value={data?.account?.updatedAt}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                            </div>

                        </div> */}

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Họ tên</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={userInformation?.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
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
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
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
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ngày sinh</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="date_of_birth"
                                    value={userInformation?.date_of_birth}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Giới tính</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="date_of_birth"
                                    value={userInformation?.date_of_birth}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Avatarr</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="date_of_birth"
                                    value={userInformation?.date_of_birth}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                            </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClickUpdateProduct} type="button" className="btn btn-primary">Edit</button>
                        </div>

                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
