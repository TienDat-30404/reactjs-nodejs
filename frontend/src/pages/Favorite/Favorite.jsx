import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFavoriteService, getFavoriteOfUserService } from '../../services/FavoriteService'
import { deleteFavoriteReudx, initDataFavorite } from '../../redux/Favorite/favoritesSlice'
import { switchPage } from '../../redux/Favorite/favoritesSlice'
import { visiblePagination } from '../../until/function'
export default function Favorite() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, userData } = useSelector(state => state.auth)
  const idUser = isAuthenticated && userData?.dataLogin?.idUser
  let limit = 4
  let page = useSelector(state => state?.favorites?.page)
  const totalPage = useSelector(state => state?.favorites.totalPage)
  const favorites = useSelector(state => state?.favorites?.data)
  const totalFavorite = useSelector(state => state?.favorites?.totalFavorite)
 
  useEffect(() => {

    const query = `idUser=${idUser}&page=${page}&limit=${limit}`
    const fetchData = async () => {
      const response = await getFavoriteOfUserService(query)
      console.log(response)
      if (response && response.status === 200) {
        dispatch(initDataFavorite(response))
      }
    }
    fetchData()
  }, [idUser, limit, page])


  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }

  const handleDeleteFavorite = async (id) => {
    try {

      const response = await deleteFavoriteService(id)
      console.log(response)

      if (response && response.status === 200) {
        dispatch(deleteFavoriteReudx(id))
        if (favorites?.length === 1 && page > 1) {
          dispatch(switchPage(page - 1))
        }
        else if(favorites?.length === 1)
        {
          console.log("123")
          dispatch(switchPage(page - 1))
        }
      }
    }
    catch (error) {
      console.log("Lỗi khi xóa favorite")
    }
  }
  return (
    <div className='col-9 row bg-white'>
      {favorites.length > 0 && totalFavorite > 0 ?
        favorites?.map((favorite, index) => (
          <div key={index} class=" col-3 mt-2">
            <img style={{ width: '220px', height: '200px' }} src={favorite?.product?.image} class="card-img-top" alt="..." />
            <div class="card-body">
              <h6 class="card-title text-center mt-1">{favorite?.product?.name}</h6>
              <p class="card-text text-primary text-center fw-semibold mt-1">{(favorite?.product?.productAttributes[0]?.priceBought).toLocaleString('vi-VN')}đ</p>
              <button onClick={() => navigate(`/detail/${favorite?.product?._id}`)} type="button" class="btn btn-outline-primary text-center w-100 mt-1">Chi tiết sản phẩm</button>
              <p onClick={() => handleDeleteFavorite(favorite?._id)} style={{ cursor: 'pointer' }} class="text-center text-danger mt-1">Xóa sản phẩm</p>
            </div>
          </div>
        )) :
        <div className='text-center'>
          <img style={{ width: '300px' }} src="https://www.freeiconspng.com/uploads/favorites-icon-png-30.png" alt="" />
          <p className='fs-4'>Bạn chưa thêm vào danh sách yêu thích sản phẩm nào</p>
        </div>
      }
      {totalPage > 1 && (
        <ul class="pagination d-flex justify-content-center">
          <li style={{ cursor: 'pointer' }} onClick={() => handlePagination(page - 1)} class={`page-item ${page === 1 ? "disabled" : ""}`}>
            <a class="page-link">Previous</a>
          </li>

          {visiblePagination(page, totalPage).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${page === pageNumber ? "active" : ""}`}
              onClick={() => handlePagination(pageNumber)}
            >
              <button className="page-link">{pageNumber}</button>
            </li>
          ))}

          <li style={{ cursor: 'pointer' }} class={`page-item ${page === totalPage ? "disabled" : ""}`}>
            <button onClick={() => handlePagination(page + 1)}
              class="page-link">Next</button>
          </li>
        </ul>
      )}

    </div>
  )
}
