import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addDiscountRedux } from '../../../../redux/Discount/discountsSlice'
import { addDiscount } from '../../../../services/DiscountService'
import { addSizeService } from '../../../../services/SizeService'
import { addSizeRedux } from '../../../../redux/Size/sizesSlice'

export default function AddAttribute({ show, close }) {


    const dispatch = useDispatch()

    const [informations, setInformations] = useState({
        name: '',
        sizePriceMultiplier: ''
    })

    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickAddAttribute = async () => {
        inputFocusRef.current.focus()
        const response = await addSizeService({
            name: informations?.name,
            sizePriceMultiplier: informations?.sizePriceMultiplier
        })

        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response && response.status == 201) {
            toast.success("Thêm thuộc tính cho sản phẩm thành công")
            dispatch(addSizeRedux(response.size))
        }
    }

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
            name: '',
            sizePriceMultiplier: ''
        })
        setErrors({})
    }
    const validateInput = (name, value) => {
        switch (name) {
            default:
                return value.trim() !== '';
        }
    };
    console.log(informations)

    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo thuộc tính cho sản phẩm</p>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên thuộc tính</label>
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
                        <label style={{ fontSize: '14px' }} className="form-label">Hệ số nhân giá</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="sizePriceMultiplier"
                                value={informations.sizePriceMultiplier}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.sizePriceMultiplier ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.sizePriceMultiplier ? errors.sizePriceMultiplier : ""}
                            />
                            {informations.sizePriceMultiplier != "" && errors.sizePriceMultiplier && <ErrorMessageInput errors={errors} field="sizePriceMultiplier" />}
                        </div>

                    </div>







                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddAttribute} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

