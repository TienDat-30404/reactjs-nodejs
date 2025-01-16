import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { addProduct } from '../../../../services/ProductService'
import { addCategory, getAllCategory } from '../../../../services/CategoryService'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select";
import { addCategoryRedux, initDataCategory } from '../../../../redux/Category/categoriesSlice'
import { getAllSizeService } from '../../../../services/SizeService'
import { initDataSize } from '../../../../redux/Size/sizesSlice'
import { toast } from 'react-toastify'

export default function AddCategory({ show, close }) {


    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

    // handle click add product
    const handleClickAddCategory = async () => {
        inputFocusRef.current.focus()
        var formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)

        const response = await addCategory(formData)
        console.log(response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if(response && response.status == 201) {
            toast.success("Thêm thể loại thành công")
            dispatch(addCategoryRedux(response.category))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setName(e.target.value)
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
        setName('')
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
                        <label style={{ fontSize: '14px' }} className="form-label">Tên thể loại</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="name"
                                value={name}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.name ? errors.name : ""}
                            />
                            {name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                        </div>

                    </div>

                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Ảnh thể loại</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                key={fileInputKey}
                                type="file"
                                name="image"
                                onChange={handleChangeFile}
                                className={`form-control ${errors.image ? 'is-invalid' : ''} `}
                                placeholder={errors.image ? errors.image : ""}
                            />
                            {errors.image && <ErrorMessageInput className errors={errors} field="image" />}
                        </div>
                    </div>


                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddCategory} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

