import React from 'react'
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
                    <div className="card column-1-5" >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>

                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                    <div className="card column-1-5 " >
                        <a href="" className="nav-link">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/4c/43/d9/b64bb0f049889968e3a82da944167efc.jpg.webp" className="card-img-top" alt="..." />
                            <div className="">
                                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                                <p style={{ fontSize: "15px", marginBottom: '0px' }} className="">Áo choàng văn phòng kiêm chăn công sở 2 lớp dày</p>
                                <div>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                                    <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                                </div>
                                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">913.000đ</p>
                                <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
