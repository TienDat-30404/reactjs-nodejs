import React, { useState, useEffect, useCallback } from 'react'
import ImageComponent from '../../components/ImageComponent'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputComponent } from '../../components/InputComponent';
import { ErrorMessageInput } from '../../components/InputComponent';
import { addOrder } from '../../services/OrderService';
import { toast, ToastContainer } from 'react-toastify';
import { addVoucher, deleteVoucher } from '../../redux/Voucher/vouchersSlice';
import { removeUseVoucher } from '../../redux/Voucher/vouchersSlice';
import { paymentByMomo, paymentByVnpService, paymentByZaloPay } from '../../services/PaymentService';
import { validateInformationPayment } from '../../until/function';
import { getAllPaymentMethod } from '../../services/PaymentMethod';
export default function Payment() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [payments, setPayments] = useState([])
    const useVoucher = useSelector(state => state?.vouchers?.useVoucher)
    const location = useLocation();
    let { cartsCheck } = location.state || {};
    let { isAuthenticated, userData, dataCart } = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser
    const phone = isAuthenticated && userData?.dataLogin?.phone

    // total Price
    const totalPrice = (cartsCheck.reduce((sum, cart) =>
        sum +
        (cart?.attribute?.priceBought * cart?.quantity *
            (cart?.attribute?.product?.discount?.length > 0 ?
                ((100 - cart?.attribute?.product.discount[0].discountValue) / 100) : 1
            ) *
            (
                useVoucher?.length > 0 ?
                    (1 - useVoucher[0]?.discountVoucher) : 1
            ) * 
            ((100 - cart?.attribute?.size?.sizePriceMultiplier) / 100)
        )
        , 0))


    const [errors, setErrors] = useState({})
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [chooseAddress, setChooseAddress] = useState({
        province: '',
        district: '',
        ward: ''
    })
    const [showPayment, setShowPayment] = useState('')
    // const [banks, setBanks] = useState([])

    const [informations, setInformations] = useState({
        idUser: isAuthenticated && userData?.dataLogin?.idUser ? userData.dataLogin.idUser : "",
        phone: '',
        address: '',
        paymentMethod: '',
        products: [],
        totalPrice: '',
        paymentMethod: '',
        useVoucher: []
    })

    useEffect(() => {
        if (idUser) {
            const provinceName = provinces.find(province => province?.id === chooseAddress?.province)?.name || "";
            const districtName = districts.find(district => district?.id === chooseAddress?.district)?.name || "";
            const wardName = wards.find(ward => ward?.id === chooseAddress?.ward)?.name || "";
            let fullAddress = ""
            if (provinceName && districtName && wardName) {
                fullAddress = provinceName + ", " + districtName + ", " + wardName
            }
            setInformations(prev => ({
                ...prev,
                idUser,
                phone,
                totalPrice,
                products: cartsCheck,
                address: fullAddress,
                useVoucher,
                paymentMethod: showPayment
            }))
        }
    }, [idUser, phone, cartsCheck, chooseAddress.province, chooseAddress.district, chooseAddress.ward, showPayment])

    // fetch data province
    useEffect(() => {
        const fetchDataProvince = async () => {
            const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            const result = await response.json()
            setProvinces(result.data)
        }
        fetchDataProvince()
    }, [])

    // fetch data district 
    useEffect(() => {
        const fetchDatasDistrict = async () => {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${chooseAddress.province}.htm`)
            const result = await response.json()
            setDistricts(result.data)
        }
        fetchDatasDistrict()
    }, [chooseAddress.province])
    // fetch data ward
    useEffect(() => {
        const fetchDatasWard = async () => {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${chooseAddress.district}.htm`)
            const result = await response.json()
            setWards(result.data)
        }
        fetchDatasWard()
    }, [chooseAddress.district])

    // fetch data Bank
    // useEffect(() => {
    //     const fetchDatasBank = async () => {
    //         const response = await fetch('https://api.vietqr.io/v2/banks')
    //         const result = await response.json()
    //         setBanks(result.data)
    //     }
    //     fetchDatasBank()
    // }, [])
    // set value Input

    useEffect(() => {
        try {
            const fetchDataPaymentMethod = async () => {
                const response = await getAllPaymentMethod()
                if (response && response.status === 200) {
                    setPayments(response.paymentMethods)
                    setShowPayment(response?.paymentMethods[0]?._id)
                }
            }
            fetchDataPaymentMethod()
        }
        catch (err) {
            console.log(`Fail when get all payment method : ${err}`)
        }
    }, [])
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformations(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    };

    const handleChangeInputChooseAddress = (e) => {
        const { name, value } = e.target;
        setChooseAddress(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    }

    // handle pay
    const handleBuy = async () => {
        const paymentMethod = payments?.find(payment => payment._id === showPayment)
        if (paymentMethod?.code === "payLater") {
            const response = await addOrder(informations)
            console.log("responnse", response)
            if (response.errors) {
                setErrors(response.errors)
                return
            }
            if (response.error) {
                alert("Lỗi khi thanh toán")
                return
            }
            if (response && response.status === 201) {
                const idProductCartCheck = new Set(cartsCheck.map(item => item.idProduct));
                dataCart = dataCart?.carts?.filter(item => !idProductCartCheck.has(item.idProduct));
                dispatch(deleteVoucher(useVoucher[0]?._id))
                dispatch(removeUseVoucher())
                response.voucherAdded.map((voucher) => {
                    dispatch(addVoucher(voucher))
                })
                toast("Đặt hàng thành công")
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }
        }
        else if (paymentMethod?.code === 'vnpay') {
            const validateInputErrors = validateInformationPayment(informations)
            if (Object.keys(validateInputErrors).length > 0) {
                setErrors(validateInputErrors)
                return
            }
            const response = await paymentByVnpService({
                amount: totalPrice,
                content: informations?.address
            })
            window.location.href = response.vnpUrl

            localStorage.setItem('informationPayment', JSON.stringify(informations))
            return;
        }
        else if (paymentMethod?.code === 'momo') {
            const validateInputErrors = validateInformationPayment(informations)
            if (Object.keys(validateInputErrors).length > 0) {
                setErrors(validateInputErrors)
                return
            }
            const response = await paymentByMomo({
                amount: totalPrice,
                orderInfo: informations?.address
            })
            window.location.href = response.result.payUrl

            localStorage.setItem('informationPayment', JSON.stringify(informations))
            return;
        }
        else if (paymentMethod?.code === 'zalopay') {
            const validateInputErrors = validateInformationPayment(informations)
            if (Object.keys(validateInputErrors).length > 0) {
                setErrors(validateInputErrors)
                return
            }
            const response = await paymentByZaloPay(
                {
                    amount: totalPrice

                }
            )
            localStorage.setItem('informationPayment', JSON.stringify(informations))
            window.location.href = response?.result?.order_url
            return;
        }
    }

    console.log(showPayment)
    return (
        <div>
            <div className='w-100 bg-white'>
                <ToastContainer
                    className="text-base"
                    fontSize="10px"
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className='col-12 container d-flex justify-content-between '>
                    <div style={{ position: 'relative' }} className='d-flex align-items-center'>
                        <ImageComponent
                            src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"
                            width="80px"
                            height="80px"
                        />
                        <div className='border_paymeny-header'></div>
                        <span style={{ marginLeft: '40px', fontSize: '24px', color: 'rgb(26, 148, 255)' }}>Địa chỉ giao hàng</span>
                    </div>
                    <div>
                        <img width="200px" src="https://salt.tikicdn.com/ts/upload/ae/b1/ea/65e64a529e4ff888c875129d3b11ff29.png" alt="" />
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#F5F5FA' }} className='w-100'>
                <div className='col-12 container'>
                    <p style={{ fontSize: '15px', color: 'rgb(51, 51, 51', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }} className='py-3 fw-bold'>Địa chỉ giao hàng</p>
                    <div style={{ backgroundColor: 'rgb(247, 247, 247)', border: '1px solid rgb(221, 221, 221)' }} className='col-12 '>
                        <div className='py-4 '>

                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Số điện thoại</label>
                                <div>
                                    <InputComponent
                                        name="phone"
                                        value={informations.phone}
                                        onChange={handleChangeInput}
                                        type="text"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''} `}
                                        style={{ width: '350px', height: '35px', border: '1px solid #ccc' }}
                                    />
                                    {errors.phone && <ErrorMessageInput errors={errors} field="phone" />}
                                </div>

                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Tỉnh/Thành phố</label>
                                <div>
                                    <select
                                        name="province"
                                        value={chooseAddress.province}
                                        onChange={handleChangeInputChooseAddress}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                        style={{ width: '350px', height: '35px', border: '1px solid #cccc' }}
                                    >
                                        <option value="">Chọn tỉnh/Thành phố</option>
                                        {provinces && provinces.length > 0 ?
                                            (
                                                provinces.map((province, index) => (
                                                    <option value={province.id} key={index}>{province.name}</option>
                                                ))
                                            ) :
                                            <option></option>
                                        }
                                    </select>
                                    {chooseAddress.province === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Quận/Huyện</label>
                                <div>
                                    <select
                                        name="district"
                                        value={chooseAddress.district}
                                        onChange={handleChangeInputChooseAddress}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                        style={{ width: '350px', height: '35px', border: '1px solid #cccc' }}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts && districts.length > 0 ?
                                            (
                                                districts.map((district, index) => (
                                                    <option value={district.id} key={index}>{district.name}</option>
                                                ))
                                            ) :
                                            <option disabled>Not Found</option>
                                        }
                                    </select>
                                    {chooseAddress.district === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Phường/Xã</label>
                                <div>
                                    <select
                                        name="ward"
                                        value={chooseAddress.ward}
                                        onChange={handleChangeInputChooseAddress}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                        style={{ width: '350px', height: '35px', border: '1px solid #cccc' }}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards && wards.length > 0 ?
                                            (
                                                wards.map((ward, index) => (
                                                    <option value={ward.id} key={index}>{ward.name}</option>
                                                ))
                                            ) :
                                            <option disabled>Not Found</option>
                                        }
                                    </select>
                                    {chooseAddress.ward === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Địa chỉ</label>
                                <div>
                                    <textarea
                                        name="address"
                                        value={informations.address}
                                        onChange={handleChangeInput}
                                        style={{ width: '350px', height: '55px', border: '1px solid #ccc' }}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''} `}
                                    >
                                    </textarea>
                                    {informations.address === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-evenly align-items-center'>
                                {payments && payments?.length > 0 && payments.map((payment, index) => (
                                    <div key = {index} class="form-check">
                                        <InputComponent
                                            value={payment?._id}
                                            onChange={(e) => setShowPayment(e.target.value)}
                                            checked={showPayment === payment?._id}
                                            style={{ border: '1px solid #ccc' }}
                                            class="form-check-input" type="radio"
                                            name="flexRadioDefault"
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            {payment?.name}
                                        </label>
                                    </div>
                                ))}

                            </div>
                            {/* {showPayment === 'payNow' ? (

                                <div>
                                    <div className='col-auto mb-3 d-flex justify-content-center'>
                                        <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Phương thức thanh toán</label>
                                        <select
                                            name="paymentMethod"
                                            value={informations.paymentMethod}
                                            onChange={handleChangeInput}
                                            className='form-control'
                                            style={{ width: '350px', height: '40px', border: '1px solid #cccc' }}
                                        >
                                            <option value="">Chọn ngân hàng</option>
                                            {banks && banks.length > 0 ?
                                                (
                                                    banks.map((bank, index) => (
                                                        <option value={bank.id} key={index}>{bank.name}</option>
                                                    ))
                                                ) :
                                                <option disabled>Not Found</option>
                                            }
                                        </select>
                                    </div>
                                    <div className='col-auto mb-3 d-flex justify-content-center'>
                                        <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Số tài khoản</label>
                                        <InputComponent
                                            name="bankAccount"
                                            value={informations.bankAccount}
                                            onChange={handleChangeInput}
                                            type="text"
                                            className='form-control'
                                            style={{ width: '350px', height: '35px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                </div>
                            ) :
                                <></>
                            } */}
                            <div className='d-flex justify-content-center'>
                                <button
                                    style={{ border: '1px solid #ccc', marginLeft: '200px', width: '163px', boxShadow: '1px 1px 0px 0px' }}
                                    type="button"
                                    className="btn btn-light">
                                    Hủy bỏ
                                </button>
                                <button
                                    onClick={handleBuy}
                                    type="button"
                                    style={{ border: '1px solid black' }}
                                    className="btn btn-info text-white ms-3">
                                    Giao đến địa chỉ này
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


