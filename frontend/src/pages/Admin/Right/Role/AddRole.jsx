import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createNotificationForAll } from '../../../../services/NotificationService'
import { createNotificationRedux } from '../../../../redux/Notification/notificationsSlice'
import { addRole } from '../../../../services/RoleService'
import { addRoleRedux } from '../../../../redux/Role/rolesSlice'


export default function AddRole({ show, close }) {

    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickCreateRole = async () => {
        inputFocusRef.current.focus()
        const response = await addRole({
            name
        })
        console.log(response)

        if (response.errors) {
            setErrors(response.errors)
            return;
        }
        if (response && response.status == 201) {
            console.log("123")
            toast.success("Tạo quyền mới thành công")
            dispatch(addRoleRedux(response.role))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setName(value)
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
        setName("")
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
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo quyền mới</p>


                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên quyền</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="name"
                                value={name}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.name ? errors.name : ""}
                            />
                            {name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                        </div>

                    </div>

                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickCreateRole} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

