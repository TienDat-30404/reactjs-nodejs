import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateRole } from '../../../../services/RoleService';
import { updateRoleRedux } from '../../../../redux/Role/rolesSlice';
import { useRoleDetail } from '../../../../until/function';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function UpdateRole({ data, show, close }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [checkPartManage, setCheckPartMange] = useState(false)
    const [updatedPermissions, setUpdatedPermissions] = useState([])
    const [initialPermissions, setInitialPermission] = useState([])
    const queryClient = useQueryClient();


    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(data?._id)
    useEffect(() => {
        if (data) {
            setInitialPermission(roleDetails?.permissions)
            setUpdatedPermissions(roleDetails?.permissions)
            setName(data?.name)
        }
    }, [show, roleDetails]);


    const { mutate: updateRoleMutation, isLoading: isUpdating } = useMutation({
        mutationFn: (updatedData) => updateRole(data?._id, updatedData),
        onSuccess: (response) => {
            if (response?.status === 200) {
                dispatch(updateRoleRedux({
                    id: data?._id,
                    newData: response.role
                }));

                queryClient.setQueryData(["permissions", data?._id], (oldData) => {
                    if (!oldData) return;
               
                    return {
                        permissions : updatedPermissions,
                        name : name
                    };
                });

                toast.success("Chỉnh sửa thành công");
            }
        },
        onError: (error) => {
            console.error(error);
            toast.error("Cập nhật thất bại!");
        }
    });

    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    console.log(updatedPermissions)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
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
        const changedPermissions = updatedPermissions.filter((perm, index) =>
            perm.allow !== initialPermissions[index].allow
        );
        console.log(changedPermissions)

        updateRoleMutation({ 
            permissions : changedPermissions,
            name : name
        });
    }

    const validateInput = (name, value) => {
        switch (name) {
            default:
                return value.trim() !== '';
        }
    };

    const handleChangePermissions = (index, value) => {
        const permission = updatedPermissions?.map((item, i) =>
            i === index ? { ...item, allow: value } : item
        )
        setUpdatedPermissions(permission)
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="detail_order">
                {show && data ? (
                    <div className=" modal-content">
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa quyền</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên quyền</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={name}
                                    placeholder={errors.name ? errors.name : ""}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>
                        </div>

                        <div class="accordion">
                            <div class="accordion-item p-3">
                                <h2 class="accordion-header">
                                    <button onClick={() => setCheckPartMange(!checkPartManage)} class="accordion-button" type="button">
                                        Permissions
                                    </button>
                                </h2>
                                {checkPartManage ? (
                                    <div className='d-flex flex-wrap' style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {updatedPermissions?.map((item, index) => (
                                            <div class="form-check me-3" key={index} style={{ minWidth: '180px' }}>
                                                <input
                                                    onChange={() => handleChangePermissions(index, !item.allow)}
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    checked={item.allow}
                                                />
                                                <label class="form-check-label">
                                                    {item.action}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : ""}

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
