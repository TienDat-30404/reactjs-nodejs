import React, { useState, useEffect, useCallback } from 'react'
import ImageComponent from '../../components/ImageComponent'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { InputComponent } from '../../components/InputComponent';
export default function Payment() {
    const { isAuthenticated, userData } = useSelector(state => state.auth)

    const location = useLocation();
    const { cartsCheck } = location.state || {};
    console.log(cartsCheck)

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
        address: ''
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
                address: ''
            })
        } else {
            setInformations({
                nameUser: '',
                phone: '',
                province: '',
                district: '',
                ward: '',
                address: ''
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
    console.log(informations)
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
        const fetchDatasBank = async() => {
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

    return (
        <div>
            <div className='w-100 bg-white'>
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
                                <InputComponent
                                    name="phone"
                                    value={informations.phone}
                                    onChange={handleChangeInput}
                                    type="text"
                                    className='form-control'
                                    style={{ width: '350px', height: '35px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Tỉnh/Thành phố</label>
                                <select
                                    name="province"
                                    value={informations.province}
                                    onChange={handleChangeInput}
                                    className='form-control'
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
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Quận/Huyện</label>
                                <select
                                    name="district"
                                    value={informations.district}
                                    onChange={handleChangeInput}
                                    className='form-control'
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
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Phường/Xã</label>
                                <select
                                    name="ward"
                                    value={informations.ward}
                                    onChange={handleChangeInput}
                                    className='form-control'
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
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center'>
                                <label style={{ fontSize: '14px', color: 'rgb(51, 51, 51)', fontWeight: '600', width: '200px' }} className='col-form-label'>Địa chỉ</label>

                                <textarea
                                    name="address"
                                    value={informations.address}
                                    onChange={handleChangeInput}
                                    style={{ width: '350px', height: '55px', border: '1px solid #ccc' }}
                                    className='form-control'
                                >
                                </textarea>
                            </div>
                            <div className='col-auto mb-3 d-flex justify-content-center align-items-center'>
                                <div class="form-check me-5">
                                    <InputComponent 
                                        value="payNow"
                                        onChange={(e) => setShowPayment(e.target.value)}
                                        checked={showPayment === 'payNow'}
                                        style = {{ border : '1px solid #ccc' }} class="form-check-input" 
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
                                        style = {{ border : '1px solid #ccc' }} 
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
                                            name="phone"
                                            value={informations.phone}
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
