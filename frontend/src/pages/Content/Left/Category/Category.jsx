import React from 'react'
const Category = () => {
    return (
        <div className='bg-white rounded-2 category'>
            <ul className="nav flex-column">
            <p style = {{fontWeight : '600'}} className="text-capitalize mt-2 ms-4">Danh mục</p>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" alt="" />
                    <a className="nav-link text-dark"  href="#">Nhà sách tiki</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/f6/22/46/7e2185d2cf1bca72d5aeac385a865b2b.png.webp" alt="" />
                    <a className="nav-link text-dark" href="#">Nhà cửa - Đời sống</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp" alt="" />
                    <a className="nav-link text-dark" href="#">Điện thoại - Máy tính bảng</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp" alt="" />
                    <a className="nav-link text-dark ">Đồ chơi - Mé & Bé</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/75/34/29/78e428fdd90408587181005f5cc3de32.png.webp" alt="" />
                    <a className="nav-link text-dark ">Thiết bị số - Phụ kiện số</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/61/d4/ea/e6ea3ffc1fcde3b6224d2bb691ea16a2.png.webp" alt="" />
                    <a className="nav-link text-dark ">Điện gia dụng</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/bf5095601d17f9971d7a08a1ffe98a42.png.webp" alt="" />
                    <a className="nav-link text-dark ">Làm đẹp - Sức khỏe</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/69/f5/36/c6cd9e2849854630ed74ff1678db8f19.png.webp" alt="" />
                    <a className="nav-link text-dark ">Ô tô - Xe đạp - Xe máy</a>
                </li>
                <li className="nav-item d-flex align-items-center ms-4">
                    <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png.webp" alt="" />
                    <a className="nav-link text-dark ">Thời trang nữ</a>
                </li>
            </ul>
        </div>
    )
}

export default Category
