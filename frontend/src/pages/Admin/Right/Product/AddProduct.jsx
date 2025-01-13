import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { addProduct } from '../../../../services/ProductService'
import { getAllCategory } from '../../../../services/CategoryService'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select";
import { initDataCategory } from '../../../../redux/Category/categoriesSlice'
import { getAllSizeService } from '../../../../services/SizeService'
import { initDataSize } from '../../../../redux/Size/sizesSlice'

export default function AddProduct({ show, close }) {


    const dispatch = useDispatch()
    const [product, setProduct] = useState({
        name: '',
        idCategory: '',
        description: ''
    })
    const [selectedOptions, setSelectedOptions] = useState([]);


    const categories = useSelector(state => state.categories.categories)
    const sizes = useSelector(state => state.sizes.data)
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            let [responseCategory, responseAttribute] = await Promise.all([
                getAllCategory(),
                getAllSizeService()
            ])
            if (responseCategory && responseCategory?.status === 200) {
                dispatch(initDataCategory(responseCategory))
            }
            if (responseAttribute && responseAttribute?.status === 200) {
                dispatch(initDataSize(responseAttribute))
            }
        }
        fetchData()
    }, [])

    const options = sizes.map((size) => ({
        value: size._id, label: size.name
    }))

    // handle click add product
    const handleClickAddProduct = async () => {
        inputFocusRef.current.focus()
        var formData = new FormData()
        formData.append('name', product.name)
        formData.append('image', image)
        formData.append('idCategory', product.idCategory)
        formData.append('description', product.description)
        selectedOptions.forEach(size => {
            formData.append('sizes[]', size.value);
        });
        const response = await addProduct(formData)
        console.log(response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        else {
            alert("Thêm sản phẩm thành công")
        }
    }

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
        setSelectedOptions(selected);
    };
    

    const closeModal = () => {
        close()
        setProduct({
            name: '',
            idCategory: '',
            description: '',
            sizes: 0
        })
        setFileInputKey(Date.now());
        setErrors({})
    }
    const validateInput = (name, value) => {
        switch (name) {
            // case 'price':
            //     return !isNaN(value) && value > 0;
            // case 'quantity':
            //     return !isNaN(value) && value > 0;
            default:
                return value.trim() !== '';
        }
    };



    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo sản phẩm</p>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên sản phẩm</label>
                        <div style={{ width: '100%' }}>
                            <InputComponent
                                name="name"
                                value={product.name}
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
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Thuộc tính</label>
                        <div style={{ width: '100%' }}>
                            <Select
                                onClick={() => console.log(options)}
                                isMulti
                                value={selectedOptions}
                                options={options}
                                onChange={handleChangeAttribute}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 150, /* Chiều cao tối đa */
                                        overflowY: 'auto', /* Hiển thị thanh cuộn */
                                    }),
                                }}
                            />
                            {errors.idCategory && <ErrorMessageInput errors={errors} field="idCategory" />}
                        </div>
                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Thể loại</label>
                        <div style={{ width: '100%' }}>
                            <select
                                value={product.idCategory}
                                name="idCategory"
                                className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                onChange={handleChangeInput}
                            >
                                <option value="0" checked>Chọn thể loại</option>
                                {categories && categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <option key={index} value={category._id}>{category.name}</option>
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
                            value={product.description}
                            onChange={handleChangeInput}
                            placeholder={errors.description ? errors.description : ""}
                        >
                        </textarea>
                    </div>


                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddProduct} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

