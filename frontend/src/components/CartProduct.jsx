import React from 'react'

export default function CartProduct({image, name, price}) {
    return (
        <div className="card column-1-5" >
            <a href="/detail" className="nav-link">
                <img src = {image} className="card-img-top" alt="..." />
                <div className="mb-3">
                    <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                    <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                    <p style={{ fontSize: "15px", marginBottom: '0px' }} className="product_name">{name}</p>
                    <div>
                        <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                        <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                        <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-fill"></i>
                        <i style={{ fontSize: "11px", color: "orange" }} class="bi bi-star-half"></i>
                    </div>
                    <p style={{ fontSize: "16px" }} className="text-danger fw-bold">{price}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-center">Mua ngay</a>
                </div>
            </a>
        </div>
    )
}
