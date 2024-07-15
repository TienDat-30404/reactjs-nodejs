import React from 'react'
import CartProduct from '../../../../../components/CartProduct'
export default function Product() {
    return (
        <div className='mt-2 bg-white rounded-2 product'>
            <p className="text-capitalize ms-4 pt-2 fw-bold">Gợi ý hôm nay</p>
            <ul className="nav">
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page" href="#">Dành cho bạn</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/12/59/f8/ef3c42e93fac779a393a5cd98a394ea6.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page" href="#">Top Deal</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/37/58/02/85786ae9e80eea21104c096b6593b37d.jpg.webp" alt="" />
                    <a className="nav-link active" aria-current="page" href="#">Sách xả kho - 60%</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/f0/db/cd/dc286242f00373007d79073074384f45.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page" href="#">Thể thao - 50%</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/a3/2e/66/05032c91d5d30f4171b2642b635c1ef6.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page" href="#">Thể thao - 50%</a>
                </li>
            </ul>
            <div className='row d-flex ms-3'>
                <div className='row'>
                    <div className='mt-2 video_product'>
                        <iframe style = {{width : '100%', height : '55%'}} src="https://www.youtube.com/embed/8pzyxuaV5iw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div className='d-flex image_demo-video'>
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/6a/a0/ff/b10971d31123358faa64ef43e6b7823d.jpg" alt="" />
                            <div>
                                <p className="">Bộ ba giường K-Bedding KMP chất liệu Microfiber bền chắc</p>
                                <div className='d-flex'>
                                    <h6>435.000đ</h6>
                                    <p className='fw-lighter'>-34%</p>
                                </div>
                                <div className='d-flex'>
                                    <p className="fw-lighter">Tài trợ bởi</p>
                                    <p>Everon Official Store</p>
                                </div>
                                <div className='mt-4 ms-2 d-flex justify-content-between align-items-center'>
                                    <img src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png" alt="" />
                                    <button className='btn btn-primary'>Xem thêm</button>
                                </div>
                            </div>  
                        </div>
                    </div>
                    
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp"
                        name = "Áo choàng văn phòng kiêm chăn công sở 2 lớp dày"
                        price = "123.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/89/33/44/9349a75d091ed4a6a276731c53b58bd1.png.webp"
                        name = "Vali Kéo Nhựa Du Lịch SAKOS SAPPHIRE Khung Nhôm Z22"
                        price = "6.549.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/ab/b5/de/86e584a77eb24801aed7c54e4191c8e0.jpg.webp"
                        name = "Nồi áp suất Elmich PCE-1805 dung tích 2.5L - Hàng Chính Hãng"
                        price = "564.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/99/86/04/7a74043bebfb2645b559fd94587ecf77.png.webp"
                        name = "Apple iPhone 15 Pro"
                        price = "23.990.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/2f/70/6a/f0890a452f9756b2b77f4bcc1eb978f2.jpg.webp"
                        name = "[MỚI] Tã/bỉm quần Mở Một Bên Bobby"
                        price = "254.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/bf/bd/f3/ad64a0494263c4e1e9d9c1288f044cc6.jpg.webp"
                        name = "Bao cao su Durex Pleasuremax Hộp 12 Bao"
                        price = "192.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/1c/dd/b7/8b02cc1ddf5ab52bb1fcf5e88b2ee4d8.png.webp"
                        name = "Tai Nghe Bluetooth Chụp Tai Sony WH-1000XM5 Hi-Res Noise Canceling - Hàng Chính Hãng"
                        price = "6.780.000đ"
                    />
                    <CartProduct 
                        image = "https://salt.tikicdn.com/cache/750x750/ts/product/21/30/c8/0626ae5799d1433f0bc5b97c5ef9a983.jpg.webp"
                        name = "Sữa bột Nestlé NAN OPTIPRO PLUS 1 800g/lon với 5HMO Sản Xuất Tại Thụy Sĩ (0 - 6 tháng)"
                        price = "478.000đ"
                    />
                    
                    
                </div>
            </div>
        </div>
    )
}
