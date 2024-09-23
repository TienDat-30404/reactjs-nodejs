import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { updateProduct, getDetailProduct } from '../../../../services/ProductService'
import { getAllCategory } from '../../../../services/CategoryService'

export default function EditProduct({ show, close, idProduct, onSuccess }) {
    const [product, setProduct] = useState({
        name: '',
        image : '',
        price: '',
        quantity: '',
        idCategory: '',
        description: ''
    })
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            if(idProduct)
            {     
                const response = await getAllCategory();
                setCategory(response.categories)
                const responseDetailProduct = await getDetailProduct(idProduct);
                if(show)
                {
                    setProduct({
                        name : responseDetailProduct.detailProduct.name,
                        image : responseDetailProduct.detailProduct.image,
                        price : responseDetailProduct.detailProduct.price,
                        quantity : responseDetailProduct.detailProduct.quantity,
                        idCategory : responseDetailProduct.detailProduct.idCategory,
                        description : responseDetailProduct.detailProduct.description
                    })
                }
            }
        }
        if(show)
        {
            fetchData()
        }
    }, [show, idProduct])

    // handle click add product
    const handleClickUpdateProduct = async () => {
        if(idProduct)
        {
            inputFocusRef.current.focus()
            var formData = new FormData()
            formData.append('name', product.name)
            formData.append('image', image)
            formData.append('price', product.price)
            formData.append('quantity', product.quantity)
            formData.append('idCategory', product.idCategory)
            formData.append('description', product.description)
            const response = await updateProduct(idProduct, formData)
            console.log(response)
            if (response.errors) {
                setErrors(response.errors)
                return
            }
            else {
                alert("Chỉnh sửa sản phẩm thành công")
                onSuccess()
            }
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

    const closeModal = () => {
        close()
        setProduct({
            name: '',
            price: '',
            quantity: '',
            idCategory: 0,
            description: ''
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
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                {product ? (
                    <div className=" modal-content">
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa sản phẩm</p>
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
                                <div className='d-flex'>
                                    <InputComponent
                                        key={fileInputKey}
                                        type="file"
                                        name="image"
                                        onChange={handleChangeFile}
                                        className={`form-control ${errors.image ? 'is-invalid' : ''} `}
                                        placeholder={errors.image ? errors.image : ""}
                                    />
                                    <img width = "60px" height = "40px" src={product.image} alt="" />
                                </div>
                                {errors.image && <ErrorMessageInput className errors={errors} field="image" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Giá sản phẩm</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="price"
                                    value={product.price}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.price ? 'is-invalid' : ''} `}
                                    placeholder={errors.price ? errors.price : ""}
                                />
                                {product.price != "" && !Number(product.price) && <p style={{ color: 'red', fontSize: '13px' }}>Giá sản phẩm không hợp lệ</p>}

                            </div>
                        </div>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Số lượng</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.quantity ? 'is-invalid' : ''} `}
                                    placeholder={errors.quantity ? errors.quantity : ""}
                                />
                                {product.quantity != "" && !Number(product.quantity) && <p style={{ color: 'red', fontSize: '13px' }}>Số lượng sản phẩm không hợp lệ</p>}

                            </div>
                        </div>
                        <div className='px-4 py-2 d-flex align-items-center'>
                            <label style={{ fontSize: '14px' }} className="form-label">Thể loại</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    value = {product.idCategory}
                                    name="idCategory"
                                    className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                    onChange={handleChangeInput}
                                >
                                    <option value="0">Chọn thể loại</option>
                                    {category.length > 0 ? (
                                        category.map((category, index) => (
                                            <option key ={index} value={category.idCategory}>{category.name}</option>
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
                            <button onClick={handleClickUpdateProduct} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
