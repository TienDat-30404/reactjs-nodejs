import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import { ErrorMessageInput } from '../../../../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addSupplier } from '../../../../services/SupplierService';
import { addSupplierRedux } from '../../../../redux/Supplier/suppliersSlice';
import { deleteProductRedux } from '../../../../redux/Products/productsSlice'
import { addReceipt } from '../../../../services/ReceiptService'
import { addReceiptRedux } from '../../../../redux/Receipt/receiptsSlice'

export default function AddReceipt({ show, close }) {

    const dispatch = useDispatch()
    const { isAuhenticated, userData } = useSelector((state) => state.auth);
    const suppliers = useSelector(state => state?.suppliers?.data)
    const products = useSelector(state => state?.products?.products)
    const [sizes, setSizes] = useState({})
    const [informationReceipt, setInformationReceipt] = useState({
        name: '',
        supplier: '',
    })
    const [indexSupplier, setIndexSupplier] = useState('')
    const inputFocusRef = useRef();
    const [errors, setErrors] = useState({})
    const [detailReceipt, setDetailReceipt] = useState(
        [
            {
                idProduct: '',
                idAttribute: '',
                price: '',
                quantity: ''
            }
        ]
    )

    useEffect(() => {
        const sizeOfProduct = {};
        let shouldUpdate = false;
        const updatedDetailReceipt = detailReceipt?.map((item, index) => {
            const idProduct = item?.idProduct;
            if (idProduct) {
                const product = products?.find((p) => p?._id === idProduct);
                if (product) {
                    const newPrice = suppliers[indexSupplier]?.supplierDetails?.find(spld => (spld?.product?._id === idProduct))?.price;
                    if (newPrice !== item.price) {
                        shouldUpdate = true;
                        return {
                            ...item,
                            price: newPrice
                        };
                    }
                    sizeOfProduct[index] = product?.productAttributes || [];
                }
            }
            return item;
        });
        if (shouldUpdate) {
            setDetailReceipt(updatedDetailReceipt);
        }
        setSizes(sizeOfProduct);
    }, [detailReceipt, products, suppliers, indexSupplier]);

    const handleChangeInputDetailReceipt = (e, index) => {
        const { name, value } = e.target;
        setDetailReceipt(prev => prev.map((item, idx) =>
            idx === index ? { ...item, [name]: value } : item
        ));
    };

    const handleClickAddProduct = (index, newProduct) => {
        setDetailReceipt(prev => [
            ...prev,
            newProduct
        ])
    }

    const handleClickDeleteProduct = (index) => {
        if (detailReceipt.length === 1) {
            return;
        }
        setDetailReceipt(prev => prev.filter((_, item) => item != index))
    }

    // handle click add product
    const handleClickAddReceipt = async () => {
        inputFocusRef.current.focus()
        const response = await addReceipt({
            idUser: userData?.dataLogin.idUser,
            name: informationReceipt.name,
            idSupplier: informationReceipt.supplier,
            totalPrice: detailReceipt?.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            products: detailReceipt
        })
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response && response.status == 201) {
            toast.success("Thêm nhà phiếu nhập thành công")
            dispatch(addReceiptRedux(response.receipt))
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformationReceipt(prev => ({
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
        setInformationReceipt({
            name: '',
            supplier: ''
        })
        setDetailReceipt([
            {
                idProduct: '',
                idAttribute: '',
                price: '',
                quantity: ''
            }
        ])
        setErrors({})
    }
    const validateInput = (name, value) => {
        // switch (name) {
        //     default:
        //         return value.trim() !== '';
        // }
    };
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="add_product">
                <div className=" modal-content px-3">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo phiếu nhập</p>
                    <div className='d-flex justify-content-between'>
                        <div className='col-5'>
                            <InputComponent
                                name="name"
                                value={informationReceipt.name}
                                onChange={handleChangeInput}
                                className={`form-control ${errors.name ? 'is-invalid' : ''} `}
                                ref={inputFocusRef}
                                placeholder={errors.name ? errors.name : "Tên phiếu nhập"}
                            />
                            {/* {information.name != "" && errors.name && <ErrorMessageInput errors={errors} field="name" />} */}
                        </div>
                        <div className='col-5'>
                            <select
                                value={informationReceipt.supplier}
                                name="supplier"
                                className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                onChange={(e) => {
                                    handleChangeInput(e)
                                    const selectedIndexSupplier = e.target.options[e.target.selectedIndex].getAttribute("data-index");
                                    setIndexSupplier(Number(selectedIndexSupplier));
                                }}
                            >
                                <option value="0" checked>Chọn nhà cung cấp</option>
                                {suppliers && suppliers.length > 0 ? (
                                    suppliers.map((supplier, index) => (
                                        <option
                                            // disabled={detailSupplier?.some(item => item.idProduct === product._id)}
                                            key={index}
                                            value={supplier._id}
                                            data-index={index}
                                        >
                                            {supplier.name}
                                        </option>
                                    ))
                                ) : <option>Hiện không có nhà cung cấp nào</option>}
                            </select>
                        </div>
                    </div>

                    {detailReceipt?.length > 0 &&
                        detailReceipt?.map((item, index) => (
                            <div className='d-flex align-items-center mt-2'>
                                <div className='col-3 me-1'>
                                    <select
                                        value={item.idProduct}
                                        name="idProduct"
                                        className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                        onChange={(e) => handleChangeInputDetailReceipt(e, index)}
                                    >
                                        <option>Chọn sản phẩm</option>
                                        {suppliers && suppliers.length > 0 ? (
                                            suppliers[indexSupplier]?.supplierDetails?.map((supplier, index) => (
                                                <option
                                                    disabled={detailReceipt?.some(item => item.idProduct === supplier?.product?._id)}
                                                    key={index} value={supplier?.product?._id}
                                                >
                                                    {supplier?.product?.name}
                                                </option>
                                            ))
                                        ) : <option>Hiện không có sản phẩm nào</option>}
                                    </select>
                                </div>

                                <div className='col-3 me-1'>
                                    <select
                                        value={item.idAttribute}
                                        name="idAttribute"
                                        className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                        onChange={(e) => handleChangeInputDetailReceipt(e, index)}
                                    >
                                        <option value="0" checked>Chọn size</option>
                                        {/* {sizes && sizes[index] && Array.isArray(sizes[index]) && Object.keys(sizes).length > 0 && sizes[0]?.map((item, index) && (
                                            <option
                                                key={index} value={item?.size?._id}
                                            >
                                                {item?.size?.name}
                                            </option>
                                        ))} */}

                                        {sizes && sizes[index] && Array.isArray(sizes[index]) && Object.keys(sizes).length > 0 ? (
                                            sizes[index]?.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item?.size?._id}
                                                >
                                                    {item?.size?.name}
                                                </option>
                                            ))
                                        ) : "123"}

                                    </select>
                                </div>

                                <div className='col-3 me-1'>
                                    <div>
                                        <InputComponent
                                            name="price"
                                            // value={
                                            //     suppliers[indexSupplier]?.supplierDetails?.find(spld => (spld?.product?._id === item?.idProduct))?.price
                                            // }             
                                            value={item.price}
                                            onChange={(e) => handleChangeInputDetailReceipt(e, index)}
                                            className={`form-control ${errors.price ? 'is-invalid' : ''} `}
                                            ref={inputFocusRef}
                                            placeholder={errors.price ? errors.price : "Giá nhập / sản phẩm"}
                                        />
                                        {/* {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="price" />} */}
                                    </div>
                                </div>


                                <div className='col-3 me-1'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>
                                            <InputComponent
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChangeInputDetailReceipt(e, index)}

                                                className={`form-control ${errors.quantity ? 'is-invalid' : ''} `}
                                                ref={inputFocusRef}
                                                placeholder={errors.quantity ? errors.quantity : "Số lượng"}
                                            />
                                            {/* {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="price" />} */}
                                        </div>
                                        <div className='d-flex '>
                                            <i
                                                onClick={() => handleClickAddProduct(index, {
                                                    idProduct: '',
                                                    idAttribute: '',
                                                    price: '',
                                                    quantity: ''
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
                        <button onClick={handleClickAddReceipt} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

