import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getDetailProduct } from '../../services/ProductService'
import { addCart } from '../../services/CartService';
import { useSelector, useDispatch } from 'react-redux';
import { addCartRedux } from '../../redux/Cart/cartsSlice';
import { toast, ToastContainer } from 'react-toastify';

export default function Detail() {
    const { _id } = useParams();
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idUser = isAuthenticated && userData.dataLogin.idUser

    const [show, setShow] = useState({
        display: false,
        status: 'success',
    })
    const [details, setDetail] = useState([])

    const dispatch = useDispatch()
    const carts = useSelector(state => state.carts.carts)
    const totalProductInCart = useSelector(state => state.carts.totalProductInCart)

    useEffect(() => {
        const fetchDataDetailProduct = async () => {
            const detailProduct = await getDetailProduct(_id)
            setDetail(detailProduct)
        }
        fetchDataDetailProduct()
    }, [_id])



    // add product on cart
    const handleAddCart = async () => {

        const isCheckExistCart = carts.find(cart => cart.product._id == _id)
        console.log(isCheckExistCart)
        if (isCheckExistCart) {
            toast.error("Sản phẩm đã được thêm vào giỏ hàng")
            return
        }

        const response = await addCart({
            idUser: idUser,
            idProduct: _id,
            quantity: 1
        })

        if (response) {
            dispatch(addCartRedux({
                cart: response,
                totalProductInCart: totalProductInCart + 1
            }))
        }

        toast.success("Thêm vào giỏ hàng thành công")
    }

    return (
        <div className="container mt-3 detail">

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

            {details && details.detailProduct ? (

                <div style={{ marginLeft: '10px', marginRight: '10px' }} className="row col-12 rounded-3">

                    <div className="col-3 row d-flex align-items-center bg-white rounded-3 me-3">
                        <div style={{ padding: '10px' }}>
                            <img
                                style={{ objectFit: 'contain' }}
                                height="300px"
                                width="100%"
                                src={details.detailProduct.image}
                            />
                        </div>
                        <div className="nav ms-2 benefit">
                            <h6>Đặc điểm nổi bật</h6>
                            <div className='d-flex '>
                                <i style={{ width: '10px' }} className="bi bi-check-circle me-2"></i>
                                {details.detailProduct.description}
                            </div>
                        </div>
                    </div>

                    <div className='col-5 rounded-3'>
                        <div className=' mb-3 bg-white p-3 rounded-3'>
                            <div >
                                <img className='me-2' style={{ width: '95px' }} src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png" alt="" />
                                <a href="">
                                    <img style={{ width: '95px' }} src="https://salt.tikicdn.com/ts/upload/79/f2/2b/0acb752c679ef97d401857a41598bc70.png" alt="" />
                                </a>
                            </div>
                            <h5 className='mt-2'>{details.detailProduct.name}</h5>
                            <div className='d-flex align-items-center'>
                                <p style={{ marginTop: '2px' }} className='mb-0 me-2'>4.8</p>
                                <div className='me-2'>
                                    <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-half"></i>
                                </div>
                                <p style={{ marginTop: '2px' }} className='mb-0 me-2'>(140)</p>
                                <div className='border-space'></div>
                                <p style={{ marginTop: '2px' }} className='mb-0 me-2'>Đã bán 5000+</p>
                            </div>
                            <h4 className='mt-2'>{(details.detailProduct.price).toLocaleString('vi-VN')}₫</h4>
                        </div>

                        <div className='bg-white p-3'>
                            <h6>Thông tin vận chuyển</h6>
                            <div className='d-flex justify-content-between'>
                                <p>Giao đến Q.1, P.Bến Nghé, Hồ Chí Minh</p>
                                <a className='nav-link text-primary' href="">Đổi</a>
                            </div>
                            <div>
                                <div>

                                    <ul className="nav shipper">
                                        <li className="nav-item d-flex align-items-center">
                                            <img width="35px" src="https://salt.tikicdn.com/ts/upload/04/da/1e/eac32401f048ffd380e50dfeda2a1c55.png" alt="" />
                                            <h6 className="text-capitalize ms-2 mt-1">Giao siêu tốc 2h</h6>
                                        </li>
                                        <li className="nav-item d-flex align-items-center">
                                            <p className='pr-1'>Trước 18h hôm nay: </p>
                                            <p className=' px-1'>Miễn phí</p>
                                            <p className='text-decoration-line-through fw-lighter'>25.000đ</p>
                                        </li>
                                        <li className="nav-item d-flex align-items-center">
                                            <img width="35px" src="https://salt.tikicdn.com/ts/upload/6b/59/d9/783a8f53f8c251dbe5f644df40c21c15.png" alt="" />
                                            <h6 className="text-capitalize ms-2 mt-1">Giao đúng sáng mai</h6>
                                        </li>
                                        <li className="nav-item d-flex align-items-center">
                                            <p className='pr-1'>8h - 12h, 16/07:</p>
                                            <p style={{ color: "#00AB56" }} className=' px-1'>Miễn phí</p>
                                            <p className='text-decoration-line-through fw-lighter'>14.000đ</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='col-3 payment'>
                        <div className='d-flex'>
                            <div>
                                <img className='rounded-4' width="40px" src="https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg.webp" alt="" />
                            </div>
                            <div className='ms-2 d-flex flex-column'>
                                <h6 style={{ marginBlock: '0px' }}>Tiki Trading</h6>
                                <div className='d-flex align-items-center introduce-shop-official'>
                                    <img width="80px" src=" https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp" alt="" />
                                    <div className='border-space ms-2'></div>
                                    <h6 style={{ marginBottom: '0px' }} className='fw-bold me-2'>4.7</h6>
                                    <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-fill"></i>
                                    <h6 style={{ fontSize: '13px', marginBottom: '0px' }} classN ame='fw-bold me-2 '>5.4tr+ đánh giá</h6>
                                </div>
                                <div style={{ width: '100%', height: '1px', backgroundColor: '#777' }} className="b"></div>
                            </div>
                        </div>
                        <h6 className='mt-2 mb-0'>Số lượng</h6>
                        <div className='mt-3 click_number'>
                            <button type="button" className="btn" disabled>-</button>
                            <button type="button" className="btn ms-1">1</button>
                            <button type="button" className="btn ms-1 ">+</button>
                        </div>
                        <h6 className='mt-3 mb-0'>Tạm tính</h6>
                        <h4 className='mt-3 mb-0'>1.000.000₫</h4>
                        <div className='d-flex flex-column mt-3'>
                            <button type="button" className="btn btn-danger">Mua ngay</button>
                            <button onClick={handleAddCart} type="button" className="btn border-primary bg-white text-primary mt-2">Thêm vào giỏ</button>
                            <button type="button" className="btn border-primary bg-white text-primary mt-2">Mua trước trả sau</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    )
}
