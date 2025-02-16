import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addDiscountRedux } from '../../../../redux/Discount/discountsSlice'
import { addDiscount } from '../../../../services/DiscountService'

export default function AddDiscount({ show, close }) {


    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const discounts = useSelector(state => state?.discounts?.data)

    const [informations, setInformations] = useState({
        product: 0,
        discountValue: '',
        endDate: ''
    })

    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickAddDiscount = async () => {
        inputFocusRef.current.focus()
        const response = await addDiscount({
            product: informations?.product,
            discountValue: informations?.discountValue,
            endDate: informations?.endDate
        })

        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response && response.status == 201) {
            toast.success("Thêm giảm giá cho sản phẩm thành công")
            dispatch(addDiscountRedux(response.discount))
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

    const handleChangeFile = (e) => {
        const selectedFileImage = e.target.files[0]
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
            product: 0,
            discountValue: '',
            endDate: ''
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
    console.log(informations)

    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo giảm giá cho sản phẩm</p>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Ngày kết thúc</label>
                        <div style={{ width: '100%' }}>
                            <select
                                value={informations.product}
                                name="product"
                                className={`form-control ${errors.product ? 'is-invalid' : ''} `}
                                onChange={handleChangeInput}
                            >
                                <option value="0" checked>Chọn sản phẩm</option>
                                {products && products.length > 0 ? (
                                    products.map((product, index) => (
                                        <option
                                            disabled={discounts?.some(item => item?.product?._id === product._id && item.status === 1)}
                                            key={index} value={product._id}
                                        >
                                            {product.name}
                                        </option>
                                    ))
                                ) : <option>Hiện không có sản phẩm nào</option>}
                            </select>
                            {informations.product != "" && errors.product && <ErrorMessageInput errors={errors} field="product" />}

                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Phần trăm giảm</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="discountValue"
                                value={informations.discountValue}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.discountValue ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.discountValue ? errors.discountValue : ""}
                            />
                            {informations.discountValue != "" && errors.discountValue && <ErrorMessageInput errors={errors} field="discountValue" />}
                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Ngày kết thúc</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                type="date"
                                name="endDate"
                                value={informations.endDate}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.endDate ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.endDate ? errors.endDate : ""}
                            />
                            {informations.endDate != "" && errors.endDate && <ErrorMessageInput errors={errors} field="endDate" />}
                        </div>

                    </div>






                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddDiscount} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

