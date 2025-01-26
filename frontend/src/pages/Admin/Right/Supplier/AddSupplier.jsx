import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addSupplier } from '../../../../services/SupplierService';
import { addSupplierRedux } from '../../../../redux/Supplier/suppliersSlice';
import { deleteProductRedux } from '../../../../redux/Products/productsSlice'

export default function AddSupplier({ show, close }) {


    const dispatch = useDispatch()
    const [information, setInformation] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
    })

    let products = useSelector(state => state?.products?.products)
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    const [detailSupplier, setDetailSupplier] = useState(
        [
            {
                idProduct: '',
                price: ''
            }
        ]
    )

    const handleChangeInputDetailSupplier = (e, index) => {
        const { name, value } = e.target;

        setDetailSupplier(prev => prev.map((item, idx) =>
            idx === index ? { ...item, [name]: value } : item
        ));
    };

    const handleClickAddProduct = (index, newProduct) => {
        setDetailSupplier(prev => [
            ...prev,
            newProduct
        ])
    }


    const handleClickDeleteProduct = (index) => {
        if(detailSupplier.length === 1)
        {
            return;
        }
        setDetailSupplier(prev => prev.filter((_, item) => item != index))
    }

    // handle click add product
    const handleClickAddSupplier = async () => {
        console.log(products)
        inputFocusRef.current.focus()
        const response = await addSupplier({
            name: information.name,
            phone: information.phone,
            address: information.address,
            email: information.email,
            products: detailSupplier
        })
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response && response.status == 201) {
            toast.success("Thêm nhà cung cấp thành công")
            dispatch(addSupplierRedux(response.supplier))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformation(prev => ({
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
        setInformation({
            name: '',
            phone: '',
            address: '',
            email: ''
        })
        setDetailSupplier([
            {
                idProduct: '',
                price: ''
            }
        ])
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
            <div className="add_product">
                <div className=" modal-content ">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo nhà cung cấp</p>
                    <div className='row'>
                        <div className='px-4 py-2 col-3'>
                            <label style={{ fontSize: '14px' }} className="form-label w-100">Tên nhà cung cấp</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    style={{ height: '30px' }}
                                    name="name"
                                    value={information.name}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.name ? errors.name : ""}
                                />
                                {information.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 col-3'>
                            <label style={{ fontSize: '14px' }} className="form-label w-100">Phone</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    style={{ height: '30px' }}
                                    name="phone"
                                    value={information.phone}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors?.phone ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.phone ? errors.phone : ""}
                                />
                                {information?.phone != "" && errors.phone && <ErrorMessageInput errors={errors} field="phone" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 col-3'>
                            <label style={{ fontSize: '14px' }} className="form-label w-100">Address</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    style={{ height: '30px' }}
                                    name="address"
                                    value={information?.address}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors?.address ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.address ? errors?.address : ""}
                                />
                                {information?.address != "" && errors?.address && <ErrorMessageInput errors={errors} field="address" />}
                            </div>
                        </div>

                        <div className='px-4 py-2 col-3'>
                            <label style={{ fontSize: '14px' }} className="form-label w-100">Email</label>
                            <div style={{ width: '100%' }}>
                                <InputComponent
                                    style={{ height: '30px' }}
                                    type="email"
                                    name="email"
                                    value={information.email}
                                    onChange={handleChangeInput}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                    ref={inputFocusRef}
                                    placeholder={errors.email ? errors.email : ""}
                                />
                                {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="email" />}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <p style={{ fontSize: '19px', paddingTop: '10px' }} className='text-center'>Thêm sản phẩm cho nhà cung cấp</p>
                        <div className='d-flex justify-content-evenly'>
                            <div className='px-4 py-2 col-4'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Product</label>
                            </div>
                            <div className='px-4 py-2 col-5'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Price</label>
                            </div>
                        </div>
                    </div>


                    {detailSupplier?.length > 0 &&
                        detailSupplier?.map((item, index) => (
                            <div className='d-flex justify-content-evenly'>
                                <div className='px-4 py-2 col-4'>
                                    <select
                                        value={item.idProduct}
                                        name="idProduct"
                                        className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                        onChange={(e) => handleChangeInputDetailSupplier(e, index)}
                                    >
                                        <option value="0" checked>Chọn sản phẩm</option>
                                        {products && products.length > 0 ? (
                                            products.map((product, index) => (
                                                <option
                                                    disabled={detailSupplier?.some(item => item.idProduct === product._id)}
                                                    key={index} value={product._id}
                                                >
                                                    {product.name}
                                                </option>
                                            ))
                                        ) : <option>Hiện không có sản phẩm nào</option>}
                                    </select>
                                </div>

                                <div className='px-4 py-2 col-5'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>
                                            <InputComponent
                                                name="price"
                                                value={item.price}
                                                onChange={(e) => handleChangeInputDetailSupplier(e, index)}

                                                className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                                ref={inputFocusRef}
                                                placeholder={errors.email ? errors.email : ""}
                                            />
                                            {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="price" />}
                                        </div>
                                        <div className='d-flex '>
                                            <i
                                                onClick={() => handleClickAddProduct(index, {
                                                    idProduct: '',
                                                    price: ''
                                                })}
                                                style={{ fontSize: '30px', cursor: 'pointer' }}
                                                class="bi bi-file-plus text-success">
                                            </i>
                                            {index !== 0 && (
                                                <i
                                                    onClick={() => handleClickDeleteProduct(index)}
                                                    style={{ fontSize: '30px', cursor: 'pointer' }}
                                                    class="bi bi-file-minus text-danger">
                                                </i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                        ))}

                    <div className="modal-footer d-flex justify-content-between ">
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClickAddSupplier} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

