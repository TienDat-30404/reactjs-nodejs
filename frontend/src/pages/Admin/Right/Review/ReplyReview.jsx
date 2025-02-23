import React, { useEffect, useState } from 'react';
import { detailOrder } from '../../../../services/OrderService';
import { confirmOrder } from '../../../../services/OrderService';
import { useSelector, useDispatch } from 'react-redux';
import { confirmOrderRedux } from '../../../../redux/Order/ordersSlice';
import { editReplyReview, replyReview } from '../../../../services/ReviewService';
import { editReplyReviewRedux, ggRedux, replyReviewRedux } from '../../../../redux/Review/reviewsSlice';
import { toast } from 'react-toastify';
import { ErrorMessageInput } from '../../../../components/InputComponent';
export default function ReplyReview({ show, close, data }) {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [error, setError] = useState({})
    const { isAuhenticated, userData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (data?.response?.length > 0) {
            setContent(data?.response[0]?.reply)
        }
        else {
            setContent('')
        }
    }, [show, data])
    const handleResponse = async () => {
        const response = await replyReview({
            idReview: data?._id,
            idSupportCustomer: userData?.dataLogin?.idUser,
            reply: content
        })
        if (response.status === 200) {
            toast.success('Phản hồi thành công')
            
            dispatch(replyReviewRedux({
                id: data?._id,
                newData: response?.replyReview
            }))
        }
        if (response?.error) {
            setError(response.error)
        }
    }

    const handleEditResponse = async () => {
        console.log(data) 
        const response = await editReplyReview({
            idReplyReview: data?.response[0]?._id,
            reply: content
        })
        console.log(response)
        if (response.status === 200) {
            toast.success('Chỉnh sửa phản hồi thành công')
            dispatch(editReplyReviewRedux({
                id: data?.response[0]?._id,
                newData: response?.review
            }))
        }
        if (response?.error) {
            setError(response.error)
        }
    }

    const handleConfirmResponse = () => {
        if (Array.isArray(data?.response) && data.response.length > 0) {
            handleEditResponse();
        } else {
            handleResponse();
        }
    }

    const handleChangeInput = (e) => {
        setContent(e.target.value)
        if (content != "") {
            setError({})
        }
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="detail_order px-2 py-3">
                <div className='d-flex justify-content-around '>
                    <div className=" col-4">
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>idReview :</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{data?._id}</p>
                        </div>
                        <div className='d-flex '>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Sender :</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{data?.user?.name}</p>
                        </div>

                    </div>
                    <div className=' col-4'>
                        <div className='d-flex '>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Created :</p>
                            <p
                                style={{ fontFamily: "Times New Roman, Times, serif" }}>{new Date(data?.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Content</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{data?.content}</p>
                        </div>

                    </div>
                    <div className=' col-5'>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Product:</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>
                                {data?.product?.name}
                            </p>
                        </div>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px', }} className='px-2'>Rating</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif", maxWidth: '80%', wordWrap: "break-word", }}>{data?.rating}</p>
                        </div>
                    </div>


                </div>

                <div className="mb-3 fw-bold">
                    <label for="exampleFormControlTextarea1" className="form-label">Phản hồi</label>
                    <textarea
                        name="reply"
                        value={content}
                        onChange={handleChangeInput}
                        className={`form-control ${error.reply ? 'is-invalid' : ''}`}
                        rows="3"
                    >
                    </textarea>
                    {content == "" && error?.reply && <ErrorMessageInput errors={error} field="reply" />}

                </div>

                <div className='d-flex justify-content-end'>
                    <button onClick={() => close()} className='btn btn-secondary me-2'>Close</button>
                    <div className='d-flex'>
                        <button onClick={() => handleConfirmResponse()} className='btn btn-primary'>Xác nhận phản hồi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
