import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFavoriteService, getFavoriteOfUserService, deleteFavoriteService } from '../services/FavoriteService'
import { toast } from 'react-toastify'
import { addFavoriteRedux, initDataFavorite, deleteFavoriteReudx } from '../redux/Favorite/favoritesSlice'
import '../public/css/favorite.css'
export default function CartProduct({ id, image, name, priceNotDiscount, percentDiscount, price, width, height, widthImage, heightImage, totalReview }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const switchDetailProduct = () => {
        navigate(`/detail/${id}`)
    }
    const { isAuthenticated, userData } = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser
    const favorites = useSelector(state => state?.favorites?.data)
    let isFavorite = favorites?.some(favorite => favorite?.product._id === id)

    const [heartPosition, setHeartPosition] = useState(null);
    const [isFlying, setIsFlying] = useState(false);
    // const flyingHeartRef = useRef(null);

    useEffect(() => {
        const query = `idUser=${idUser}`
        const fetchData = async () => {
            const response = await getFavoriteOfUserService(query)
            console.log(response)
            if (response && response.status === 200) {
                dispatch(initDataFavorite(response))
            }
        }
        fetchData()
    }, [idUser])

    const handleAddFavorite = async (e, idProduct) => {
        e.stopPropagation()

        const rect = e.target.getBoundingClientRect();
        setHeartPosition({
            top: rect.top,
            left: rect.left,
        });

        const response = await addFavoriteService({
            idUser,
            idProduct: idProduct
        })
        if (response && response?.status === 201) {
            dispatch(addFavoriteRedux(response?.favorite))
            setIsFlying(true);
            setTimeout(() => setIsFlying(false), 1000);
        }
        else if (response && response?.status === 400) {
            toast.error(response?.message)
        }
    }

    const handleDeleteFavorite = async (e, id) => {
        e.stopPropagation()
        const idFavorite = favorites.find(favorite => favorite?.product._id === id)._id
        try {
            const response = await deleteFavoriteService(idFavorite)
            console.log(response)

            if (response && response.status === 200) {
                dispatch(deleteFavoriteReudx(idFavorite))
            }
        }
        catch (error) {
            console.log("Lỗi khi xóa favorite")
        }

    }


    return (
        <>
            <div style={{ height: height, width: width }} onClick={switchDetailProduct} className="card column-1-5" >
                <img width={widthImage} height={heightImage} src={image} className="card-img-top" alt="..." />
                <div className="mb-3">
                    <img width="90px" src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" />
                    <img width="90px" src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" />
                    <p style={{ fontSize: "15px" }} className="product_name">{name}</p>
                    {priceNotDiscount ? (
                        <div className='d-flex'>
                            <p style={{ fontSize: "16px" }} className="text-decoration-line-through text-danger fw-bold me-2">{priceNotDiscount}</p>
                            <p>-{percentDiscount}</p>
                        </div>
                    ) : ""}

                    <p style={{ fontSize: "16px" }} className="text-danger fw-bold">{price}đ</p>
                    
                    {Array.from({ length: 5 }, (_, index) => {
                        if (index + 1 < totalReview) {
                            return <i key={index} style={{ fontSize: "12px", color: "orange" }} className="bi bi-star-fill"></i>;
                        }
                        else if (totalReview >= Math.floor(totalReview) + 0.5 && totalReview > index) {
                            return <i style={{ fontSize: "13px", color: "orange" }} className="bi bi-star-half"></i>
                        }
                        else {
                            return <i key={index} style={{ fontSize: "12px", color: "orange" }} className="bi bi-star"></i>;
                        }
                    })}
                    {isFavorite ? (
                        <i
                            onClick={(e) => handleDeleteFavorite(e, id)}
                            style={{ cursor: 'pointer' }}
                            className="ms-3 bi bi-balloon-heart-fill text-danger">
                        </i>
                    ) :
                        <i
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleAddFavorite(e, id)} className="ms-3 bi bi-balloon-heart ">
                        </i>
                    }

                </div>
            </div>
            {isFlying && heartPosition && (
                <div
                    // ref={flyingHeartRef}
                    className="heart-fly"
                    style={{
                        top: `${heartPosition.top}px`,
                        left: `${heartPosition.left}px`,
                        position: 'fixed',
                    }}
                ></div>
            )}
        </>
    )
}


