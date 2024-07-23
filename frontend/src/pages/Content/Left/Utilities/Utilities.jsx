import React from 'react'

const Utilities = () => {
    return (
        <div className='mt-3 bg-white rounded-2 utilities '>
            <ul class="nav flex-column">
                <p style = {{fontWeight : '600'}} class="text-capitalize mt-2 ms-4 ">Tiện ích</p>
                <a href="">
                    <li class="nav-item d-flex align-items-center ms-4">
                        <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/upload/1e/27/a7/e2c0e40b6dc45a3b5b0a8e59e2536f23.png.webp" alt="" />
                        <h5 class="nav-link text-dark" href="#">Ưu đãi thẻ, ví</h5>
                    </li>
                </a>
                <a href="">
                    <li class="nav-item d-flex align-items-center ms-4">
                        <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/upload/4d/a3/cb/c86b6e4f17138195c026437458029d67.png.webp" alt="" />
                        <h5 class="nav-link text-dark" href="#">Đóng tiền, nạp thẻ</h5>
                    </li>
                </a>
                <a href="">
                    <li class="nav-item d-flex align-items-center ms-4">
                        <img width="35px" src="https://salt.tikicdn.com/cache/100x100/ts/tmp/6f/4e/41/93f72f323d5b42207ab851dfa39d44fb.png.webp" alt="" />
                        <h5 class="nav-link text-dark" href="#">Mua trước, trả sau</h5>
                    </li>
                </a>
            </ul>
        </div>
    )
}

export default Utilities
