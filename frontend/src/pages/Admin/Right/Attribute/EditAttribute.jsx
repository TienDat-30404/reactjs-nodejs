import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateSizeService } from '../../../../services/SizeService';
import { updateSizeRedux } from '../../../../redux/Size/sizesSlice';


export default function EditAttribute({ data, show, close }) {
    const dispatch = useDispatch()
    const [informations, setInformations] = useState({
        name : '',
        sizePriceMultiplier : ''
    })


    useEffect(() => {
        if (data) {
            setInformations({
                name : data?.name,
                sizePriceMultiplier : data?.sizePriceMultiplier
            })
        }
    }, [show]);




    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformations(prev => ({
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



    const closeModal = () => {
        close()
        setInformations({
            name : '',
            sizePriceMultiplier : ''
        })
        setErrors({})
    }

    const handleUpdateAttribute = async () => {
        inputFocusRef.current.focus()

        const response = await updateSizeService(data?._id, {
            name: informations?.name,
            sizePriceMultiplier: informations?.sizePriceMultiplier
        })
        if (response && response?.status === 200) {
            dispatch(updateSizeRedux(
                {
                    id: data?._id,
                    newData: response.attribute
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa thuộc tính sản phẩm</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên thuộc tính</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={informations.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {informations?.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Hệ số nhân giá</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="sizePriceMultiplier"
                                    value={informations.sizePriceMultiplier}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.sizePriceMultiplier ? 'is-invalid' : ''} `}
                                    placeholder = {errors.sizePriceMultiplier ? errors.sizePriceMultiplier : ""}
                                    ref={inputFocusRef}
                                />
                                {informations?.sizePriceMultiplier != "" && errors.sizePriceMultiplier && <ErrorMessageInput errors={errors} field="sizePriceMultiplier" />}
                            </div>
                        </div>


                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateAttribute} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
