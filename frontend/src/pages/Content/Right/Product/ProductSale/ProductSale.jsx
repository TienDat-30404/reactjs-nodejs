import React from 'react'
import CartProduct from '../../../../../components/CartProduct'
export default function ProductSale() {
    return (
        <div className='mt-3 bg-white rounded-2 product-sale'>
            <div className='d-flex justify-content-between align-items-center ms-4 me-4 mb-2'>
                <div className='d-flex align-items-center'>
                    <img className='rounded-4 me-2' width="40px" src="https://salt.tikicdn.com/ts/upload/2f/52/8e/00ab5fbea9d35fcc3cadbc28d7c6b14e.png" alt="" />
                    <p className=" text-uppercase text-danger fw-bold">TOP DEAL - SIÊU GIÁ RẺ</p>
                </div>
                <a className="text-capitalize text-primary nav-link">Xem Tất Cả</a>
            </div>
            <div className='d-flex align-items-center ms-4'>
                <p className='border border-primary rounded-5 px-3 py-1 text-primary'>Chăm sóc nhà cửa</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Phụ kiện thời trang</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Ngon</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Nhà Sách Tiki</p>
            </div>
            <div className='row pb-3 d-flex ms-3 product'>
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/b7/7d/81/aa3a475b6bdeb70e6df677c4025a8591.jpg.webp"
                    name="Vali khoá sập thời trang da cao cấp size 20 inch nhập khẩu Hàn Quốc TRESETTE 1910 "
                    price="2.730.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/9e/1c/22/eb5425c8b3b3b46a8bfcf5aef33ab677.jpg.webp"
                    name="Bộ quần áo Bà Ba Dài tay ngắn bé gái họa tiết Hoa Cúc Xanh Ngọc Gấm Lụa - AICDBGV96PAY - AIN Closet"
                    price="155.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/60/c9/0c/2f5bee730bb2ff052b7592c50ba2ce20.jpg.webp"
                    name="Xe máy Honda Air Blade 125cc 2025 - Phiên Bản Đặc Biệt"
                    price="44.738.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/c3/72/e3/a1e1fefd4b263a7d3f3e078495de7d72.jpg.webp"
                    name="Ví da nữ mini nhỏ gọn đựng tiền đựng thẻ YUUMY YV29 nhiều màu"
                    price="69.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/fa/64/69/1e41dcd4cdcd22c2d8a55167d69c838c.jpg.webp"
                    name="Nón bảo hiểm fullface ROYAL H1 trắng bóng"
                    price="750.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/97/a5/45/f9ef547cd20e0152a8b83c6270aa83bd.jpg.webp"
                    name="Găng tay cao su tự nhiên Lock&Lock ETM830 (có móc treo)"
                    price="30.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/5c/ab/6b/e9b9e78a631ee0b37f3490c363ef982c.jpeg.webp"
                    name="Tai nghe chụp tai Bluetooth P47"
                    price="73.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/a2/1f/bd/efdf89b1c4f9223ea273834e07a1b053.jpg.webp"
                    name="Bình Giữ Nhiệt Lock&Lock Energetic One-Touch Tumbler LHC3249 - 550ML"
                    price="268.400₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/71/02/d1/6797915b1993a0b18dcee2c7b27ce057.jpg.webp"
                    name="Giày Sandal quai hậu cho bé gái, thể thao siêu nhẹ, chống trơn trượt – GSD9097"
                    price="240.000₫"
                />
                <CartProduct
                    image="https://salt.tikicdn.com/cache/750x750/ts/product/d1/e7/42/fdc068ce8be872f948bb41cc0705ff57.jpg.webp"
                    name="Đèn Pha Xe Đạp Chiếu Sáng Cao Cấp Chống Nước Gắn Ghi-Đông Siêu Sáng Sạc Điện Type-C Có Đồng Hồ Hiển Thị Thời Gian Lượng Pin Có Hỗ trợ Sạc Khẩn Cấp C30ML Mai Lee"
                    price="331.455₫"
                />
            </div>
        </div>

    )
}
