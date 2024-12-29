import React, { useState, useEffect, useCallback } from 'react'
import ImageComponent from '../../components/ImageComponent'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputComponent } from '../../components/InputComponent';
import { ErrorMessageInput } from '../../components/InputComponent';
import { addOrder } from '../../services/OrderService';
import { toast, ToastContainer } from 'react-toastify';
export default function Payment() {
    const nagigate = useNavigate()
    let { isAuthenticated, userData, dataCart } = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData.dataLogin.idUser
    const location = useLocation();
    let { cartsCheck } = location.state || {};
    console.log("payments", cartsCheck)
    // total Price
    const totalPrice = cartsCheck.reduce((sum, cart) =>
        sum +
        (cart?.attribute?.priceBought * cart?.attribute?.size?.sizePriceMultiplier * cart?.quantity *
            (cart?.attribute?.product?.discount?.length > 0 ?
                cart?.attribute?.product.discount[0].discountValue : 1
            )
        )
        , 0)


    const [errors, setErrors] = useState({})
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [banks, setBanks] = useState([])

    const [informations, setInformations] = useState({
        nameUser: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        address: '',
        paymentMethod: '',
        bankAccount: ''
    })

    const [showPayment, setShowPayment] = useState('payLater')
    const displayDefaultInformation = useCallback(() => {
        if (isAuthenticated && userData?.dataLogin) {
            const { name, phone } = userData.dataLogin
            setInformations({
                nameUser: name,
                phone,
                province: '',
                district: '',
                ward: '',
                address: '',
                paymentMethod: '',
                bankAccount: ''
            })
        } else {
            setInformations({
                nameUser: '',
                phone: '',
                province: '',
                district: '',
                ward: '',
                address: '',
                paymentMethod: '',
                bankAccount: ''
            })
        }
    }, [isAuthenticated, userData])

    useEffect(() => {
        displayDefaultInformation()
    }, [displayDefaultInformation]);
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
            const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${informations.province}.htm`)
            const result = await response.json()
            setDistricts(result.data)
        }
        fetchDatasDistrict()
    }, [informations.province])
    // fetch data ward
    useEffect(() => {
        const fetchDatasWard = async () => {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${informations.district}.htm`)
            const result = await response.json()
            setWards(result.data)
        }
        fetchDatasWard()
    }, [informations.district])

    // fetch data Bank
    useEffect(() => {
        const fetchDatasBank = async () => {
            const response = await fetch('https://api.vietqr.io/v2/banks')
            const result = await response.json()
            setBanks(result.data)
        }
        fetchDatasBank()
    }, [])
    // set value Input
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInformations(prevInfor => ({
            ...prevInfor,
            [name]: value
        }));
    };
    // handle button buy Product
    const handleBuy = async () => {

        const response = await addOrder({
            idUser,
            totalPrice,
            phone: informations.phone,
            address:
                informations.province && informations.district && informations.ward && informations.address
                    ? ` ${provinces.find(province => province.id === informations.province).name}, ${districts.find(district => district.id === informations.district).name}, ${wards.find(ward => ward.id === informations.ward).name}, ${informations.address}`
                    :
                    "",
            paymentMethod: informations.paymentMethod ?
                banks.find(bank => bank.id === parseInt(informations.paymentMethod)).name : 'Thanh toán sau khi nhận hàng',

            bankAccount: informations.bankAccount,
            products: cartsCheck,
            totalPrice: totalPrice

        })
        console.log(response)
        if (response.errors) {
            setErrors(response.errors)
            return
        }
        if (response.error) {
            alert("Lỗi khi thanh toán")
            return
        }
        const idProductCartCheck = new Set(cartsCheck.map(item => item.idProduct));
        dataCart = dataCart.carts.filter(item => !idProductCartCheck.has(item.idProduct));
        toast("Đặt hàng thành công")
        setTimeout(() => {
            nagigate('/')
        }, 2500)
    }
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
                            <div className='col-auto mb-3 d-flex col-12 justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Họ và tên</label>
                                <InputComponent
                                    name="nameUser"
                                    value={informations.nameUser}
                                    onChange={handleChangeInput}
                                    type="text"
                                    className='form-control'
                                    style={{ width: '350px', height: '35px', border: '1px solid #ccc' }}
                                />
                            </div>
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
                                        value={informations.province}
                                        onChange={handleChangeInput}
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
                                    {informations.province === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Quận/Huyện</label>
                                <div>
                                    <select
                                        name="district"
                                        value={informations.district}
                                        onChange={handleChangeInput}
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
                                    {informations.district === "" && <ErrorMessageInput errors={errors} field="address" />}
                                </div>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Phường/Xã</label>
                                <div>
                                    <select
                                        name="ward"
                                        value={informations.ward}
                                        onChange={handleChangeInput}
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
                                    {informations.ward === "" && <ErrorMessageInput errors={errors} field="address" />}
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
                            <div className='col-auto mb-3 d-flex justify-content-center align-items-center'>
                                <div class="form-check me-5">
                                    <InputComponent
                                        value="payNow"
                                        onChange={(e) => setShowPayment(e.target.value)}
                                        checked={showPayment === 'payNow'}
                                        style={{ border: '1px solid #ccc' }} class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                    />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Thanh toán ngay
                                    </label>
                                </div>
                                <div class="form-check">
                                    <InputComponent
                                        value="payLater"
                                        onChange={(e) => setShowPayment(e.target.value)}
                                        checked={showPayment === 'payLater'}
                                        style={{ border: '1px solid #ccc' }}
                                        class="form-check-input" type="radio"
                                        name="flexRadioDefault"
                                    />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Thanh toán khi đã nhận hàng
                                    </label>
                                </div>
                            </div>
                            {showPayment === 'payNow' ? (

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
                            }
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


