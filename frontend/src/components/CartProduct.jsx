import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFavoriteService } from '../services/FavoriteService'
import { toast } from 'react-toastify'

export default function CartProduct({ id, image, name, priceNotDiscount, percentDiscount, price, width, height, widthImage, heightImage }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const switchDetailProduct = () => {
        navigate(`/detail/${id}`)
    }
    const { isAuthenticated, userData } = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser
    const handleAddFavorite = async (e, idProduct) => {
        e.stopPropagation()
        const response = await addFavoriteService({
            idUser,
            idProduct: idProduct
        })
        if (response) {
            toast.success("Thêm yêu thích sản phẩm thành công")
        }
    }
    return (
        <div style={{ height: height, width: width }} onClick={switchDetailProduct} className="card column-1-5" >
            <img width={widthImage} height={heightImage} src={image} className="card-img-top" alt="..." />
            <div className="mb-3">
                <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                <p style={{ fontSize: "15px"}} className="product_name">{name}</p>
                {priceNotDiscount ? (
                    <div className='d-flex'>
                        <p style={{ fontSize: "16px" }} className="text-decoration-line-through text-danger fw-bold me-2">{priceNotDiscount}</p>
                        <p>-{percentDiscount}</p>
                    </div>
                ) : ""}

                <p style={{ fontSize: "16px" }} className="text-danger fw-bold">{price}đ</p>
                <div>
                    <i style={{ fontSize: "11px", color: "orange" }} className="bi bi-star-fill"></i>
                    <i style={{ fontSize: "11px", color: "orange" }} className="bi bi-star-fill"></i>
                    <i style={{ fontSize: "11px", color: "orange" }} className="bi bi-star-fill"></i>
                    <i style={{ fontSize: "11px", color: "orange" }} className="bi bi-star-half"></i>
                </div>
                <i style = {{ cursor : 'pointer' }} onClick={(e) => handleAddFavorite(e, id)} class="bi bi-balloon-heart "></i>
                <i class="bi bi-balloon-heart-fill text-danger"></i>

            </div>
        </div>
    )
}


