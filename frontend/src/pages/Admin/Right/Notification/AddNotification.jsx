import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createNotificationForAll } from '../../../../services/NotificationService'
import { createNotificationRedux } from '../../../../redux/Notification/notificationsSlice'


export default function AddNotification({ show, close }) {

    const dispatch = useDispatch()

    const [content, setContent] = useState('')

    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickAddNotification = async () => {
        inputFocusRef.current.focus()
        const response = await createNotificationForAll({
            content
        })
        console.log(response)

        if (response.errors) {
            setErrors(response.errors)
            return;
        }
        if (response && response.status == 201) {
            toast.success("Tạo thông báo thành công")
            dispatch(createNotificationRedux(response.notification))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
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
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo thông báo</p>


                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Nội dung</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="content"
                                value={content}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.content ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.content ? errors.content : ""}
                            />
                            {content != "" && errors.content && <ErrorMessageInput errors={errors} field="content" />}
                        </div>

                    </div>

                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddNotification} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

