import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { editVoucher } from '../../../../services/VoucherService.js';
import { editVoucherRedux } from '../../../../redux/Voucher/vouchersSlice.js';


export default function EditVoucher({ data, show, close }) {
    const dispatch = useDispatch()
    const [informations, setInformations] = useState({
        discountVoucher: '',
        description: '',
        endDate: '',
        status: ''
    })


    useEffect(() => {
        if (data) {
            setInformations({
                discountVoucher: data?.discountVoucher,
                description: data?.description,
                endDate: data?.endDate,
                status: data?.status
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
            discountVoucher: '',
            description: '',
            endDate: '',
            status: ''
        })
        setErrors({})
    }

    const handleUpdateDiscount = async () => {
        inputFocusRef.current.focus()

        const response = await editVoucher(data?._id, {
            discountVoucher: informations.discountVoucher,
            description: informations.description,
            endDate: informations.endDate,
            status: informations.status
        })
        if (response && response?.status === 200) {
            dispatch(editVoucherRedux(
                {
                    _id: data?._id,
                    newData: response.voucher
                }
            ))
        }
        console.log(response)
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Cập nhật trạng thái đơn hàng</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Discount Voucher</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="discountVoucher"
                                    value={informations.discountVoucher}
                                    placeholder={errors.discountVoucher ? errors.discountVoucher : ""}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.discountVoucher ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />

                                {errors.discountVoucher && <ErrorMessageInput errors={errors} field="discountVoucher" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Description</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="description"
                                    value={informations.description}
                                    placeholder={errors.description ? errors.description : ""}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />

                                {errors.description && <ErrorMessageInput errors={errors} field="description" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ngày kết thúc</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    type="date"
                                    name="endDate"
                                    value={informations.endDate.split('T')[0]}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.endDate ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {informations?.endDate != "" && errors.endDate && <ErrorMessageInput errors={errors} field="endDate" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ngày kết thúc</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    name="status"
                                    value={informations.status}
                                    onChange={handleChangeInput}
                                    className="form-select"
                                >
                                    <option disabled = {informations.status === 0} value="1">Được sử dụng</option>
                                    <option  value="0">Hết hạn sử dụng</option>
                                </select>
                            </div>
                        </div>



                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateDiscount} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div >
    )
}
