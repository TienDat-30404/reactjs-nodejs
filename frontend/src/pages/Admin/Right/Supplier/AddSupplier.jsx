import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addSupplier } from '../../../../services/SupplierService';
import { addSupplierRedux } from '../../../../redux/Supplier/suppliersSlice';

export default function AddSupplier({ show, close }) {


    const dispatch = useDispatch()
    const [information, setInformation] = useState({
        name : '',
        phone : '',
        address : '',
        email : ''
    })

    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickAddSupplier = async () => {
        inputFocusRef.current.focus()
        console.log(information.address)
        const response = await addSupplier({
            name : information.name,
            phone : information.phone,
            address : information.address,
            email : information.email
        })
        console.log(response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if(response && response.status == 201) {
            toast.success("Thêm nhà cung cấp thành công")
            dispatch(addSupplierRedux(response.supplier))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformation(prev => ({
            ...prev,
            [name] : value

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

    const closeModal = () => {
        close()
        setInformation({})
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
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo thể loại</p>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên nhà cung cấp</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="name"
                                value={information.name}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.name ? errors.name : ""}
                            />
                            {information.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                        </div>
                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Phone</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="phone"
                                value={information.phone}
                                onChange={handleChangeInput}
                                className={`form-control ${errors?.phone ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.phone ? errors.phone : ""}
                            />
                            {information?.phone != "" && errors.phone && <ErrorMessageInput errors={errors} field="phone" />}
                        </div>
                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Address</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="address"
                                value={information?.address}
                                onChange={handleChangeInput}
                                className={`form-control ${errors?.address ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.address ? errors?.address : ""}
                            />
                            {information?.address != "" && errors?.address && <ErrorMessageInput errors={errors} field="address" />}
                        </div>
                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên nhà cung cấp</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                type = "email"
                                name="email"
                                value={information.email}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.email ? errors.email : ""}
                            />
                            {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="email" />}
                        </div>
                    </div>


                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddSupplier} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

