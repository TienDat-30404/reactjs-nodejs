import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct } from '../../../../services/ProductService'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { updateProductRedux } from '../../../../redux/Products/productsSlice'

export default function EditProduct({ data, show, close }) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const sizes = useSelector(state => state.sizes.data)
    const [product, setProduct] = useState({
        name: '',
        idCategory: '',
        description: ''
    })
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
            setProduct({
                name: data?.name || '',
                idCategory: data?.category?._id || '',
                description: data?.description || ''
            });
            const attributeOfProduct = data?.productAttributes?.map(attr => ({
                value: attr?.size?._id, label: attr?.size.name
            }))
            setSelectedOptions(attributeOfProduct)

    }, [show]);


    const options = sizes.map((size) => ({
        value: size._id, label: size.name
    }))

    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


   
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
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

    const handleChangeAttribute = (selected) => {
        setSelectedOptions(selected)
    }

    const closeModal = () => {
        close()
        setProduct({
            name: '',
            idCategory: 0,
            description: ''
        })
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleClickUpdateProduct = async () => {
        inputFocusRef.current.focus()
        var formData = new FormData()
        formData.append('name', product.name)
        formData.append('image', image)
        formData.append('description', product.description)
        formData.append('idCategory', product.idCategory)
        selectedOptions?.length > 0 ? selectedOptions?.map((size) => {
            formData.append('sizes[]', size.value)
        }) : formData.append('sizes[]', [])

        const response = await updateProduct(data?._id, formData)
        if(response && response?.status === 200)
        {
            console.log(response.product)
            dispatch(updateProductRedux({
                id : data?._id ,
                newData : response?.product
            }))
        }
        console.log("response107", response)
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
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa sản phẩm</p>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Tên sản phẩm</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="name"
                                    value={product?.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {product.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>

                        </div>
                     
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Ảnh sản phẩm</label>
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

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Thuộc tính</label>
                            <div style={{ width: '100%' }}>
                                <Select
                                    isMulti
                                    value={selectedOptions}
                                    options={options}
                                    onChange={handleChangeAttribute}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 150,
                                            overflowY: 'auto',
                                        }),
                                    }}
                                />
                                {errors.size && <ErrorMessageInput errors={errors} field="size" />}
                                {errors.size && <ErrorMessageInput errors={errors} field="size" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Thể loại</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    value={product?.idCategory}
                                    name="idCategory"
                                    className={`form-control ${errors?.idCategory ? 'is-invalid' : ''} `}
                                    onChange={handleChangeInput}
                                >
                                    <option value="0">Chọn thể loại</option>
                                    {categories?.length > 0 ? (
                                        categories?.map((category, index) => (
                                            <option key={index} value={category?._id}>{category?.name}</option>
                                        ))
                                    ) : <option>Hiện không có thể loại sản phẩm nào</option>}
                                </select>
                                {errors.idCategory && <ErrorMessageInput errors={errors} field="idCategory" />}
                            </div>
                        </div>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Mô tả sản phẩm</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''} `}
                                name="description"
                                value={product?.description}
                                onChange={handleChangeInput}
                                placeholder={errors.description ? errors.description : ""}
                            >
                            </textarea>
                        </div>

                        <div className="modal-footer d-flex justify-content-between ">
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClickUpdateProduct} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
