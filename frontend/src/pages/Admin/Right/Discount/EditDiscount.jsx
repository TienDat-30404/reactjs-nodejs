import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct } from '../../../../services/ProductService'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateProductRedux } from '../../../../redux/Products/productsSlice'
import { updateCategory } from '../../../../services/CategoryService'
import { updateCategoryRedux } from '../../../../redux/Category/categoriesSlice'
import { updateDiscount } from '../../../../services/DiscountService'
import { updateDiscountRedux } from '../../../../redux/Discount/discountsSlice'

export default function EditDiscount({ data, show, close }) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const [informations, setInformations] = useState({
        product: '',
        discountValue: '',
        endDate: ''
    })


    useEffect(() => {
        if (data) {
            setInformations({
                product: data?.product,
                discountValue: data?.discountValue,
                endDate: data?.endDate
            })
        }
    }, [show]);




    const [fileInputKey, setFileInputKey] = useState(Date.now());
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
            product: '',
            discountValue: '',
            endDate: ''
        })
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleUpdateDiscount = async () => {
        inputFocusRef.current.focus()

        const response = await updateDiscount(data?._id, {
            discountValue: informations.discountValue,
            endDate: informations.endDate
        })
        if (response && response?.status === 200) {
            dispatch(updateDiscountRedux(
                {
                    id: data?._id,
                    newData: response.discount
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa giảm giá sản phẩm</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên sản phẩm</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="product"
                                    value={informations.product.name}
                                    readOnly
                                    className={`form-control`}
                                    ref={inputFocusRef}
                                />
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
                                    placeholder = {errors.discountValue ? errors.discountValue : ""}
                                    ref={inputFocusRef}
                                />
                                {informations?.discountValue != "" && errors.discountValue && <ErrorMessageInput errors={errors} field="discountValue" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ngày kết thúc</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    type="date"
                                    name="endDate"
                                    value={informations.endDate.split('T')[0] }
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.endDate ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {informations?.endDate != "" && errors.endDate && <ErrorMessageInput errors={errors} field="endDate" />}
                            </div>

                        </div>



                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateDiscount} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
