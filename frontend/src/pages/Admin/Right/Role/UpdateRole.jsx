import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateRole } from '../../../../services/RoleService';
import { updateRoleRedux } from '../../../../redux/Role/rolesSlice';


export default function UpdateRole({ data, show, close }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')


    useEffect(() => {
        if (data) {
            setName(data?.name)
        }
    }, [show]);




    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


    const handleChangeInput = (e) => {
        const {name, value} = e.target
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

    const handleUpdateRole = async () => {
        inputFocusRef.current.focus()

        const response = await updateRole(data?._id, {
            name
        })
        if (response && response?.status === 200) {
            dispatch(updateRoleRedux(
                {
                    id: data?._id,
                    newData: response.role
                }
            ))
        }
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
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                {show && data ? (
                    <div className=" modal-content">
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa quyền</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên quyền</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={name}
                                    placeholder = {errors.name ? errors.name : ""}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>
                        </div>


                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateRole} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
