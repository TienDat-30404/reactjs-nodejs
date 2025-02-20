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
import { updateNotificationService } from '../../../../services/NotificationService'
import { updateNotificationRedux } from '../../../../redux/Notification/notificationsSlice'

export default function EditNotification({ data, show, close }) {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')


    useEffect(() => {
        if (data) {
            setContent(data?.content)
        }
    }, [show]);




    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


    const handleChangeInput = (e) => {
        const {name, value} = e.target
       setContent(value)
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
        setContent("")
        setErrors({})
    }

    const handleUpdateNotification = async () => {
        inputFocusRef.current.focus()

        const response = await updateNotificationService(data?._id, {
            content
        })
        if (response && response?.status === 200) {
            dispatch(updateNotificationRedux(
                {
                    id: data?._id,
                    newData: response.notification
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa thông báo</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Nội dung</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="content"
                                    value={content}
                                    placeholder = {errors.content ? errors.content : ""}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.content ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                />
                                {content != "" && errors.content && <ErrorMessageInput errors={errors} field="content" />}
                            </div>
                        </div>


                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateNotification} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
