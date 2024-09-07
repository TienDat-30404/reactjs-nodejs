import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct, getDetailProduct } from '../../../../services/ProductService'
import { getAllCategory } from '../../../../services/CategoryService'
import { getAllRole } from '../../../../services/RoleService'
import { getDetailUser } from '../../../../services/UserService'
export default function EditUser({ show, close, idUser }) {
    const [informations, setInformations] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        date_of_birth: '',
        sex : '',
        avatar : '',
        idRole : ''
    })
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const fetchDatasRole = async () => {
            const response = await getAllRole();
            setRoles(response.roles)
        }
        fetchDatasRole()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (idUser) {
                const response = await getDetailUser(idUser);
                console.log("123")
                console.log(response)
                if (show) {
                    setInformations({
                        name: response.detailUser.name,
                        email: response.detailUser.email,
                        address: response.detailUser.address,
                        phone: response.detailUser.phone,
                        date_of_birth: response.detailUser.date_of_birth,
                        sex: response.detailUser.sex,
                        avatar: response.detailUser.avatar,
                        idRole: response.detailUser.idRole
                        
                    })
                }
            }
        }
        if (show) {
            fetchData()
        }
    }, [show, idUser])

    // handle click add product
    const handleClickUpdateProduct = async () => {
        // inputFocusRef.current.focus()

        // var formData = new FormData()
        // formData.append('name', product.name)
        // formData.append('image', image)
        // formData.append('price', product.price)
        // formData.append('quantity', product.quantity)
        // formData.append('idCategory', product.idCategory)
        // formData.append('description', product.description)
        // console.log(idUser)
        // const response = await updateProduct(1, formData)
        // console.log(response)
        // if (response.errors) {
        //     setErrors(response.errors)
        //     return
        // }
        // else {
        //     alert("Chỉnh sửa sản phẩm thành công")
        // }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformations(prevInfo => ({
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
    console.log(informations)
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
        setInformations({
            name: '',
            email: '',
            address: '',
            phone: '',
            date_of_birth: '',
            sex : '',
            avatar : '',
            idRole : ''
        })
        setFileInputKey(Date.now());
        setErrors({})
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
                {informations ? (
                    <div className=" modal-content">
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa người dùng</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên người dùng</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={informations.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="email"
                                    value={informations.email}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Địa chỉ</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="address"
                                    value={informations.address}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Số điện thoại</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="phone"
                                    value={informations.phone}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ngày sinh</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    type="date"
                                    name="date_of_birth"
                                    value={informations.date_of_birth}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Giới tính</label>
                            <div style={{ width: '100%' }}>
                                <select name="" id="" className='form-control' value = {informations.sex}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                                {/* {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                            </div>
                        </div>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ảnh đại diện</label>
                            <div style={{ width: '100%' }}>
                                <div className='d-flex'>
                                    <InputComponent
                                        key={fileInputKey}
                                        type="file"
                                        name="image"
                                        onChange={handleChangeFile}
                                        className={`form-control ${errors.image ? 'is-invalid' : ''} `}
                                        placeholder={errors.image ? errors.image : ""}
                                    />
                                    <img width="60px" height="40px" src={informations.image} alt="" />
                                </div>
                                {/* {errors.image && <ErrorMessageInput className errors={errors} field="image" />} */}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Loại tài khoản</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    value={roles.idRole}
                                    name="idRole"
                                    className={`form-control  ${errors.idRole ? 'is-invalid' : ''}  `}
                                    onChange={handleChangeInput}
                                >
                                    <option value="0" checked>Chọn loại tài khoản</option>
                                    {roles.length > 0 ? (
                                        roles.map((role, index) => (
                                            <option key={index} value={role.idRole}>{role.name}</option>
                                        ))
                                    ) : <option>Hiện không có loại tài khoản nào. Vui lòng thêm vào loại tài khoản để sử dụng chức năng này.</option>}
                                </select>
                                {/* {errors.idRole && <ErrorMessageInput errors={errors} field="idRole" />} */}
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
