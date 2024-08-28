import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { addProduct } from '../../../../services/ProductService'
export default function AddProduct({ show, close }) {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        idCategory: '',
        description: ''
    })
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();

    // handle click add product
    const handleClickAddProduct = async () => {
        inputFocusRef.current.focus()
        var formData = new FormData()
        formData.append('name', product.name)
        formData.append('image', image)
        formData.append('price', product.price)
        formData.append('quantity', product.quantity)
        formData.append('idCategory', product.idCategory)
        formData.append('description', product.description)
        const response = await addProduct(formData)
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));

    };
    const handleChangeFile = (e) => {
        setImage(e.target.files[0]);
    };

    const closeModal = () => {
        close()
        setProduct({
            name: '',
            price: '',
            quantity: '',
            idCategory: '',
            description: ''
        })
        setFileInputKey(Date.now());
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="modal-dialog add_product">
                <div className=" modal-content">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo sản phẩm</p>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} className="form-label">Tên sản phẩm</label>
                        <InputComponent
                            name="name"
                            value={product.name}
                            onChange={handleChangeInput}
                            className={`form-control`}
                            ref={inputFocusRef}
                        />
                        {/* {errors.oldPassword && <ErrorMessageInput errors={errors} field="oldPassword" />} */}

                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Ảnh sản phẩm</label>
                        <InputComponent
                            key={fileInputKey}
                            type="file"
                            name="image"
                            onChange={handleChangeFile}
                            className={`form-control`}
                        />
                        {/* {errors.password && <ErrorMessageInput errors={errors} field="password" />} */}

                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Giá sản phẩm</label>
                        <InputComponent
                            name="price"
                            value={product.price}
                            onChange={handleChangeInput}
                            className={`form-control`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {/* {errors.confirmPassword && <ErrorMessageInput errors={errors} field="confirmPassword" />} */}
                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Số lượng</label>
                        <InputComponent
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChangeInput}
                            className={`form-control`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {/* {errors.confirmPassword && <ErrorMessageInput errors={errors} field="confirmPassword" />} */}
                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Thể loại</label>
                        <InputComponent
                            name="idCategory"
                            value={product.idCategory}
                            onChange={handleChangeInput}
                            className={`form-control`}
                            aria-describedby="passwordHelpBlock"
                        />
                        {/* {errors.confirmPassword && <ErrorMessageInput errors={errors} field="confirmPassword" />} */}
                    </div>
                    <div className='px-4 py-2 d-flex align-items-center'>
                        <label style={{ fontSize: '14px' }} htmlFor="inputPassword5" className="form-label">Mô tả sản phẩm</label>
                        <textarea className='form-control'
                            name="description"
                            value={product.description}
                            onChange={handleChangeInput}
                        >
                        </textarea>
                        {/* {errors.confirmPassword && <ErrorMessageInput errors={errors} field="confirmPassword" />} */}
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
