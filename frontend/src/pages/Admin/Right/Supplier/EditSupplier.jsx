import React, { useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { deleteProductOfSupplierRedux, updateSupplierRedux } from '../../../../redux/Supplier/suppliersSlice';
import { deleteProductOfSupplier, updateSupplier } from '../../../../services/SupplierService';

export default function EditSupplier({ data, show, close }) {
    const dispatch = useDispatch()
    const [information, setInformation] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        products: []
    })
    const products = useSelector(state => state?.products?.products)
    console.log(information.products)
    useEffect(() => {
        if (data) {
            setInformation({
                name: data?.name,
                address: data?.address,
                phone: data?.phone,
                email: data?.email,
                products: data?.supplierDetails?.map(item => ({
                    idProduct: item?.product?._id,
                    price: item?.price
                }))
            })
        }
    }, [show]);


    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})


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

    const handleChangeInputDetailSupplier = (e, index) => {
        const { name, value } = e.target;

        setInformation(prev => ({
            ...prev,
            products: prev?.products?.map((item, idx) =>
                idx === index ? { ...item, [name]: value } : item
            )
        }))
    };

    const closeModal = () => {
       
        close()
        setInformation({})
        setFileInputKey(Date.now());
        setErrors({})
    }

    const handleClickAddProduct = () => {
        setInformation(prev => ({
            ...prev,
            products: [
                ...prev.products,
                { idProduct: '', price: '' }
            ]
        }));
    };

    const handleDeleteProductOfSupplier = async (items, index) => {
        if (items.idProduct === '') {
            console.log(index)
            setInformation(prev => ({
                ...prev,
                products: prev?.products?.filter((_, i) => i != index)
            }))
            return;
        }
        const response = await deleteProductOfSupplier(items)
        if (response.status === 200) {

            setInformation(prev => ({
                ...prev,
                products: [
                    ...prev.products.filter(p => p.idProduct !== items.idProduct)
                ]
            }));
            // dispatch(deleteProductOfSupplierRedux(data?._id))
        }
    }

    const handleUpdateSupplier = async () => {
        inputFocusRef.current.focus()
        console.log("information", information)
        const response = await updateSupplier(data?._id, {
            name: information?.name,
            address: information?.address,
            phone: information?.phone,
            email: information?.email,
            products: information?.products
        })
        console.log("123", response)
        if (response && response?.status === 200) {
            dispatch(updateSupplierRedux(
                {
                    id: data?._id,
                    newData: response.dataUpdate
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
            <div className="add_product">
                {show && data ? (
                    <div className=" modal-content">
                        <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Chỉnh sửa nhà cung cấp</p>
                        <div className='row'>
                            <div className='px-4 py-2 col-3'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Tên nhà cung cấp</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="name"
                                        value={information?.name}
                                        onChange={handleChangeInput}
                                        className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                        ref={inputFocusRef}
                                        placeholder={errors?.name ? errors?.name : ""}
                                    />
                                    {information?.name != "" && errors?.name && <ErrorMessageInput errors={errors} field="name" />}
                                </div>
                            </div>
                            <div className='px-4 py-2 col-3'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Địa chỉ</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="address"
                                        value={information?.address}
                                        onChange={handleChangeInput}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                        ref={inputFocusRef}
                                        placeholder={errors?.address ? errors?.address : ""}
                                    />
                                    {information?.address != "" && errors?.address && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>

                            <div className='px-4 py-2 col-3'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Phone</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="phone"
                                        value={information?.phone}
                                        onChange={handleChangeInput}
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''} `}
                                        ref={inputFocusRef}
                                        placeholder={errors?.phone ? errors?.phone : ""}
                                    />
                                    {information?.phone != "" && errors?.phone && <ErrorMessageInput errors={errors} field="phone" />}
                                </div>

                            </div>

                            <div className='px-4 py-2 col-3'>
                                <label style={{ fontSize: '14px' }} className="form-label w-100">Email</label>
                                <div style={{ width: '100%' }}>
                                    <InputComponent
                                        name="email"
                                        value={information?.email}
                                        onChange={handleChangeInput}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                        ref={inputFocusRef}
                                        placeholder={errors?.email ? errors?.email : ""}
                                    />
                                    {information?.email != "" && errors?.email && <ErrorMessageInput errors={errors} field="email" />}
                                </div>

                            </div>

                        </div>

                        <div className='row'>
                            {/* <p style={{ fontSize: '19px', paddingTop: '10px' }} className='text-center'>Thêm sản phẩm cho nhà cung cấp</p> */}
                            <div className='d-flex justify-content-evenly'>
                                <div className='px-4 py-2 col-4'>
                                    <label style={{ fontSize: '14px' }} className="form-label w-100">Product</label>
                                </div>
                                <div className='px-4 py-2 col-5'>
                                    <label style={{ fontSize: '14px' }} className="form-label w-100">Price</label>
                                </div>
                            </div>
                        </div>

                        {data && information?.products?.length > 0 &&
                            information?.products?.map((item, index) => (
                                <div className='d-flex justify-content-evenly'>
                                    <div className='px-4 py-2 col-4'>
                                        <select
                                            value={item?.idProduct}
                                            name="idProduct"
                                            className={`form-control ${item.idProduct === "" ? 'is-invalid' : ''} `}
                                            onChange={(e) => handleChangeInputDetailSupplier(e, index)}
                                        >
                                            <option value="0" checked>Chọn sản phẩm</option>
                                            {products && products.length > 0 ? (
                                                products.map((product, index) => (
                                                    <option
                                                        disabled={information?.products?.some(item => item.idProduct === product._id)}
                                                        key={index} value={product._id}
                                                    >
                                                        {product.name}
                                                    </option>
                                                ))
                                            ) : <option>Hiện không có sản phẩm nào</option>}
                                        </select>
                                        {item.idProduct === "" && <ErrorMessageInput errors={errors} field="product" />}

                                    </div>

                                    <div className='px-4 py-2 col-5'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <InputComponent
                                                    name="price"
                                                    value={item.price}
                                                    onChange={(e) => handleChangeInputDetailSupplier(e, index)}
                                                    className={`form-control ${item.price === "" ? 'is-invalid' : ''} `}
                                                    ref={inputFocusRef}
                                                    placeholder={item.price === "" ? errors.price : ""}
                                                />
                                                {item?.price === "" && errors.price && <ErrorMessageInput errors={errors} field="price" />}
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
                                                {information?.products?.length > 1 && (
                                                    <i
                                                        onClick={() => handleDeleteProductOfSupplier(
                                                            {
                                                                idSupplier: data?._id,
                                                                idProduct: item?.idProduct
                                                            }, 
                                                            index
                                                        )}
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
                            <button onClick={handleUpdateSupplier} type="button" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                ) : <p>123</p>}
            </div>
        </div>
    )
}
