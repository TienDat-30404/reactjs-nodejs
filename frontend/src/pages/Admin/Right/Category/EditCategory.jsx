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

export default function EditCategory({ data, show, close }) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const [name, setName] = useState('')


    useEffect(() => {
        if (data) {
            setName(data.name)
        }
    }, [show]);


   

    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})

   
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

    const handleUpdateCategory = async () => {
        inputFocusRef.current.focus()
        var formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)

        const response = await updateCategory(data?._id, formData)
        if(response && response?.status === 200)
        {
            toast.success("Chỉnh sửa thành công")
            dispatch(updateCategoryRedux(
                {
                    id : data?._id, 
                    newData : response.category
                }
            ))
        }
        if (response.errors) {
            setErrors(response.errors)
            return
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa thể loại</p>
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
                                <div className='d-flex'>
                                    <InputComponent
                                        key={fileInputKey}
                                        type="file"
                                        name="image"
                                        onChange={handleChangeFile}
                                        className={`form-control ${errors.image ? 'is-invalid' : ''} `}
                                        placeholder={errors?.image ? errors?.image : ""}
                                    />
                                    <img width="60px" height="40px" src={data?.image} alt="" />
                                </div>
                                {errors.image && <ErrorMessageInput className errors={errors} field="image" />}
                            </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateCategory} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
