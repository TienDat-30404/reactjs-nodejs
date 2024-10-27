import React, { Children, useEffect, useState } from 'react'
import { GetDetailMessage } from '../../../services/MessageService'
import { getDetailUser } from '../../../services/UserService'
import { useSelector } from 'react-redux'
export default function GeneralMessage({ show, close, switchDetailMessage }) {
    const { isAuthenticated, userData } = useSelector(state => state.auth)
    const [messages, setMessages] = useState([])
    const [nameMessageOfUser, setNameMessageOfUser] = useState([]);

    useEffect(() => {
        
        const fetchDataMessage = async () => {
            if (isAuthenticated && userData) {
                const response = await GetDetailMessage(userData.dataLogin.idUser);
                setMessages(response.conversations);
        
                // Tạo một mảng các promise cho việc lấy tên người dùng
                const namesPromises = Object.keys(response.conversations).map(async (key) => {
                    const userId = parseInt(key.split('_')[1]);
                    return getDetailUser(userId); // Trả về promise từ getDetailUser
                });
        
                // Chờ tất cả các promise hoàn thành
                const names = await Promise.all(namesPromises);
                setNameMessageOfUser(names);
            }
        };
        
        // Gọi hàm fetchDataMessage
        fetchDataMessage();
        
        console.log(nameMessageOfUser)
        fetchDataMessage();
    }, [isAuthenticated, userData]);

    const handleSwitchDetailMessage = (key) => {
        close()
        switchDetailMessage(key)
    }
    return (
        <div className={`general_message p-2 ${show ? 'd-block' : 'd-none'} `}>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>Đoạn chat</h3>
                <div className=''>
                    <i style={{ fontSize: '20px' }} class="bi bi-three-dots p-4"></i>
                    <i style={{ fontSize: '20px' }} class="bi bi-grid-3x3-gap"></i>
                </div>
            </div>
            <input class="form-control mt-2" list="datalistOptions" id="exampleDataList" placeholder="Tìm kiếm tin nhắn..." />
            <div className='mt-3'>
                <button type="button" class="btn btn-info me-2">Hộp thoại</button>
                <button type="button" class="btn btn-light">Cộng đồng</button>
            </div>



            {Object.keys(messages).map((key) => (

                <div onClick={() => handleSwitchDetailMessage(key)} className='mt-3 d-flex align-items-center general_message-content'>
                    <img
                        width="45px"
                        className='rounded-2'
                        src="https://scontent.fhan4-3.fna.fbcdn.net/v/t1.6435-1/152256675_830708044179501_4412667266017141843_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=zHeKk027D0YQ7kNvgHO16_R&_nc_ht=scontent.fhan4-3.fna&oh=00_AYAaelseltUFmW7nMBb5Eb-dZR0SdkA34a9DQ2PUPLjFBA&oe=672367D6" alt=""
                    />
                    <div className='ms-3'>
                        <h6 style={{ fontSize: '17px' }} className='fw-bold'>1234</h6>
                        <div className='d-flex align-items-center'>
                            <h6 className='general_message-content-text' style={{ fontSize: '15px', }}>{messages[key][0].content}</h6>
                            <h6 className='general_message-time-text px-2'>20 giờ</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
