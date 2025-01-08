import React, { useCallback, useRef } from 'react'
import { addReviewRedux, initDataReview, loadMoreReview } from '../../redux/Review/reviewsSlice'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addReview, getAllReviewOfProduct } from '../../services/ReviewService'
import { formatTime } from '../../until/function'
import { useLoadMoreData, debounce} from '../../until/function'

export default function Review({ idProduct }) {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const idUser = isAuthenticated && userData.dataLogin.idUser
  const reviews = useSelector(state => state.reviews.reviews)
  const limit = useSelector(state => state.reviews.limit)
  const totalReview = useSelector(state => state.reviews.totalReview)
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0);

  const loadMoreData = useLoadMoreData()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = `limit=${limit}`
        const response = await getAllReviewOfProduct(idProduct, query)
        if (response) {
          dispatch(initDataReview(response))
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
    
    const debouncedLoadMoreReviews = debounce(() => loadMoreData(limit, totalReview, loadMoreReview, dispatch), 200);
    window.addEventListener("scroll", debouncedLoadMoreReviews);

    return () => window.removeEventListener("scroll", debouncedLoadMoreReviews);
  }, [idProduct, limit, loadMoreData])

  

  const handleClick = (index) => {
    setRating(rating === index ? 0 : index);
  };

  const handleAddReview = async () => {
    try {
      if (content == "") {
        inputRef.current.focus()
        inputRef.current.style.borderColor = 'red';
        toast.error("Vui lòng nhập bình luận sản phẩm")
        return;
      }
      if (rating === 0) {
        toast.error("Vui lòng đánh giá sao")
        return;
      }

      const response = await addReview({
        idUser,
        idProduct,
        content,
        rating
      })
      console.log(response)
      if (response && response.status === 201) {
        dispatch(addReviewRedux(response.review))
        toast.success("Bình luận thành công")
        setContent("")
        setRating(0)
      }
    }
    catch (error) {
      console.log("Lỗi khi bình luận sản phẩm", error)
    }
  }
  return (
    <div className='mt-3'>
      <div class=" mb-3">
        <input type="text" name="content" value={content} class="form-control" placeholder="Viết bình luận"
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
        />
        <div className="mt-2 text-center">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              width="20px"
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`w-8 h-8 cursor-pointer ${rating >= index + 1 ? "text-warning" : "text-secondary"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 17.75l5.14 3.03-1.37-5.92 4.55-3.85-5.93-.48L12 2.75 9.11 11.53l-5.93.48 4.55 3.85-1.37 5.92L12 17.75z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <div onClick={() => handleAddReview()} class="input-group-append text-center mt-3">
          <button class="btn btn-outline-secondary" type="button">Bình luận</button>
        </div>
      </div>
      {reviews && reviews?.length > 0 && reviews?.map((review, index) => (
        <div key={index} className='py-3 border-bottom'>
          <div className='d-flex'>
            <img style={{ width: '40px', height: '40px' }} src="https://tse2.mm.bing.net/th?id=OIP.7MddAHCT3e7T8Z_gLwVffwHaE8&pid=Api&P=0&h=180" class="card-img-top" alt="..." />
            <div class="card-body px-3">
              <div className='d-flex align-items-center'>
                <p style={{ fontSize: '12px' }} className='me-2 fw-bold'>{review?.user?.name}</p>
                <p style={{ fontSize: '12px' }}>{formatTime(review?.createdAt)}</p>
                <div className='ms-2'>
                  {Array.from({ length: 5 }, (_, index) => {
                    if (index < review.rating) {
                      return <i key={index} style={{ fontSize: "12px", color: "orange" }} className="bi bi-star-fill"></i>;
                    } else {
                      return <i key={index} style={{ fontSize: "12px", color: "orange" }} className="bi bi-star"></i>;
                    }
                  })}
                </div>
              </div>
              <p class="card-text">{review.content}</p>
            </div>
          </div>

          {review?.response && review?.response.length > 0 && review?.response.map((response, index) => (
            <div key={index} className='d-flex mt-2 ms-5'>
              <img style={{ width: '40px', height: '40px' }} src="https://tse2.mm.bing.net/th?id=OIP.7MddAHCT3e7T8Z_gLwVffwHaE8&pid=Api&P=0&h=180" class="card-img-top" alt="..." />
              <div class="card-body px-3">
                <div className='d-flex align-items-center'>
                  <p style={{ fontSize: '12px' }} className='me-2 fw-bold'>{response.user.name}</p>
                  <p style={{ fontSize: '12px' }}>{formatTime(response?.createdAt)}</p>
                </div>
                <p class="card-text">{response?.reply}</p>
              </div>
            </div>
          ))}
        </div>
      ))
      }





    </div>
  )
}
