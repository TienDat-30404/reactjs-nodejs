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
    const sizes = useSelector(state => state?.sizes?.data)
    const [supplier, setSupplier] = useState('')

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
    console.log(detailReceipt)

    // handle click add product
    const handleClickAddReceipt = async () => {
        inputFocusRef.current.focus()
        const response = await addReceipt({
            idUser: userData?.dataLogin.idUser,
            idSupplier: supplier,
            totalPrice: 1000,
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

    // const handleChangeInput = (e) => {
    //     const { name, value } = e.target;
    //     setInformation(prev => ({
    //         ...prev,
    //         [name]: value

    //     }))
    //     const isValid = validateInput(name, value);
    //     setErrors(prevErrors => {
    //         const newErrors = { ...prevErrors };

    //         if (isValid) {
    //             delete newErrors[name];
    //         } else {
    //             newErrors[name] = newErrors[name]
    //         }

    //         return newErrors;
    //     });
    // };

    const closeModal = () => {
        close()
        setSupplier('')
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
                <div className=" modal-content ">
                    <p style={{ fontSize: '20px', paddingTop: '20px' }} className='text-center'>Tạo phiếu nhập</p>
                    <select
                        value={supplier}
                        name="supplier"
                        className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                        onChange={(e) => setSupplier(e.target.value)}
                    >
                        <option value="0" checked>Chọn nhà cung cấp</option>
                        {suppliers && suppliers.length > 0 ? (
                            suppliers.map((supplier, index) => (
                                <option
                                    // disabled={detailSupplier?.some(item => item.idProduct === product._id)}
                                    key={index} value={supplier._id}
                                >
                                    {supplier.name}
                                </option>
                            ))
                        ) : <option>Hiện không có nhà cung cấp nào</option>}
                    </select>


                    {detailReceipt?.length > 0 &&
                        detailReceipt?.map((item, index) => (
                            <div className='d-flex justify-content-evenly'>
                                <div className='px-4 py-2 col-4'>
                                    <select
                                        value={item.idProduct}
                                        name="idProduct"
                                        className={`form-control ${errors.idCategory ? 'is-invalid' : ''} `}
                                        onChange={(e) => handleChangeInputDetailReceipt(e, index)}
                                    >
                                        <option value="0" checked>Chọn sản phẩm</option>
                                        {suppliers && suppliers.length > 0 ? (
                                            suppliers[2]?.supplierDetails?.map((item, index) => (
                                                <option
                                                    // disabled={detailSupplier?.some(item => item.idProduct === product._id)}
                                                    key={index} value={item?.product?._id}
                                                >
                                                    {item?.product?.name}
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
                                                onChange={(e) => handleChangeInputDetailReceipt(e, index)}

                                                className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                                ref={inputFocusRef}
                                                placeholder={errors.email ? errors.email : ""}
                                            />
                                            {/* {information.email != "" && errors.email && <ErrorMessageInput errors={errors} field="price" />} */}
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
                        <button onClick={handleClickAddReceipt} type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

