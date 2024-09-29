import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { getAllRole, addRole } from '../../../../services/RoleService'
import { signInService } from '../../../../services/UserService'
export default function AddUser({ show, close, onSuccess }) {
    const [informations, setInformations] = useState({
        name: '',
        email: '',
        password: '',
        idRole: '',
    })
    
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
        console.log(informations)
    }, [informations.name, informations.email, informations.password, informations.idRole])

    // handle click add account
    const handleClickAddAccount = async () => {
        inputFocusRef.current.focus()
        const response = await signInService(
            {
                name : informations.name,
                email : informations.email,
                password : informations.password,
                confirm_password : informations.password,
                idRole : informations.idRole
            }
        )
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        else {
            alert("Thêm tài khoản thành công")
            onSuccess()
        }
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

    const closeModal = () => {
        close()
        setInformations({
            name: '',
            email: '',
            password: '',
            idRole: 0,
        })
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
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo sản phẩm</p>
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
                            {informations.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="email"
                                value={informations.email}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                placeholder={errors.email ? errors.email : ""}
                            />
                            {informations.email != "" && errors.email && <ErrorMessageInput errors={errors} field="email" />}
                        </div>
                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Mật khẩu</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="password"
                                value={informations.password}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                ref={inputFocusRef}
                                placeholder={errors.password ? errors.password : ""}
                            />
                            {informations.password != "" && errors.password && <ErrorMessageInput errors={errors} field="password" />}
                        </div>
                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Loại tài khoản</label>
                        <div style = {{ width : '100%' }}>
                            <select 
                                value = {roles.idRole}
                                name="idRole" 
                                className={`form-control  ${errors.idRole ? 'is-invalid' : ''}  `} 
                                onChange={handleChangeInput}
                            >
                                <option value="0" checked>Chọn loại tài khoản</option>
                                {roles.length > 0 ? (
                                    roles.map((role, index) => (
                                        <option key = {index} value={role.idRole}>{role.name}</option>
                                    ))
                                ) : <option>Hiện không có loại tài khoản nào. Vui lòng thêm vào loại tài khoản để sử dụng chức năng này.</option>}
                            </select>
                            {errors.idRole && <ErrorMessageInput errors={errors} field="idRole" />}
                        </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddAccount} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
