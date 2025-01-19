import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select";
import { toast } from 'react-toastify'
import { addUser } from '../../../../services/UserService'
import { addUserRedux } from '../../../../redux/User/usersSlice';

export default function AddUser({ show, close }) {

    const dispatch = useDispatch()
    const [userInformation, setUserInformation] = useState({
        userName: '',
        email: '',
        password: '',
        role: '',
        name: '',
        phone: ''
    })
    const roles = useSelector(state => state?.roles?.roles)

    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


    // handle click add product
    const handleClickAddUser = async () => {
        inputFocusRef.current.focus()
        console.log(userInformation.role)
        const response = await addUser({
            userName: userInformation.userName,
            email: userInformation.email,
            password: userInformation.password,
            role: userInformation.role,
            name: userInformation.name,
            phone: userInformation.phone
        })
        console.log("ff", response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response && response.status === 201) {
            toast.success("Thêm người dùng thành công")
            dispatch(addUserRedux(response.userInformation))
        }
    }

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




    const closeModal = () => {
        close()
        setUserInformation({
            userName: '',
            email: '',
            password: '',
            role: '',
            name: '',
            phone: ''
        })
        setErrors({})
    }
    const validateInput = (name, value) => {
        switch (name) {
            // case 'price':
            //     return !isNaN(value) && value > 0;
            // case 'quantity':
            //     return !isNaN(value) && value > 0;
            default:
                return value.trim() !== '';
        }
    };



    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo người dùng</p>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">UserName</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="userName"
                                value={userInformation.userName}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.userName ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.userName ? errors.userName : ""}
                            />
                            {userInformation.userName != "" && errors.userName && <ErrorMessageInput errors={errors} field="userName" />}
                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="email"
                                value={userInformation.email}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.email ? errors.email : ""}
                            />
                            {userInformation?.email != "" && errors.email && <ErrorMessageInput errors={errors} field="email" />}
                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Password</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="password"
                                value={userInformation.password}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.password ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.password ? errors.password : ""}
                            />
                            {userInformation?.password != "" && errors.password && <ErrorMessageInput errors={errors} field="password" />}
                        </div>

                    </div>



                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Quyền</label>
                        <div style={{ width: '100%' }}>
                            <select
                                value={userInformation.role}
                                name="role"
                                className={`form-control ${errors.role ? 'is-invalid' : ''} `}
                                onChange={handleChangeInput}
                            >
                                <option value="" checked>Chọn quyền</option>
                                {roles && roles.length > 0 ? (
                                    roles.map((role, index) => (
                                        <option key={index} value={role._id}>{role.name}</option>
                                    ))
                                ) : <option>Hiện không có quyền nào</option>}
                            </select>
                            {errors?.role && <ErrorMessageInput errors={errors} field="role" />}
                        </div>
                    </div>


                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Họ và tên</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="name"
                                value={userInformation.name}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.name ? errors.name : ""}
                            />
                            {userInformation?.name != "" && errors?.name && <ErrorMessageInput errors={errors} field="name" />}
                        </div>

                    </div>

                    
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Số điện thoại</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="phone"
                                value={userInformation.phone}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.phone ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.phone ? errors.phone : ""}
                            />
                            {userInformation?.phone != "" && errors?.phone && <ErrorMessageInput errors={errors} field="phone" />}
                        </div>

                    </div>


                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddUser} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

