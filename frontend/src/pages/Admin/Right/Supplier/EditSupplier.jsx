import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateSupplierRedux } from '../../../../redux/Supplier/suppliersSlice';
import { updateSupplier } from '../../../../services/SupplierService';

export default function EditSupplier({ data, show, close }) {
    const dispatch = useDispatch()
    const [information, setInformation] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    })

    useEffect(() => {
        if (data) {
            setInformation({
                name: data?.name,
                address: data?.address,
                phone: data?.phone,
                email: data?.email
            })
        }
    }, [show]);




    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformation(prev => ({
            ...prev,
            [name]: value
        }))
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
        setInformation({})
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleUpdateSupplier = async () => {
        inputFocusRef.current.focus()
        console.log(data?._id)
        console.log(information)
        const response = await updateSupplier(data?._id, {
            name: information?.name,
            address: information?.address,
            phone: information?.phone,
            email: information?.email
        })
        console.log("123", response)
        if (response && response?.status === 200) {
            dispatch(updateSupplierRedux(
                {
                    id: data?._id,
                    newData: response.dataUpdate
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa nhà cung cấp</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên nhà cung cấp</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={information?.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors?.name ? errors?.name : ""}
                                />
                                {information?.name != "" && errors?.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>

                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Địa chỉ</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="address"
                                    value={information?.address}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors?.address ? errors?.address : ""}
                                />
                                {information?.address != "" && errors?.address && <ErrorMessageInput errors={errors} field="address" />}
                            </div>

                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Phone</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="phone"
                                    value={information?.phone}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors?.phone ? errors?.phone : ""}
                                />
                                {information?.phone != "" && errors?.phone && <ErrorMessageInput errors={errors} field="phone" />}
                            </div>

                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Email</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="email"
                                    value={information?.email}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors?.email ? errors?.email : ""}
                                />
                                {information?.email != "" && errors?.email && <ErrorMessageInput errors={errors} field="email" />}
                            </div>

                        </div>

                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateSupplier} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
