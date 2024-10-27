import React, { useState, useEffect, useRef } from 'react';
import { GetDetailMessage, AddMessage } from '../../../services/MessageService';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'; 

const socket = io(process.env.REACT_APP_API_URL); 

export default function DetailMessage({ show, close, idUser, keyMessage }) {
    const { isAuthenticated, userData } = useSelector(state => state.auth);
    const [messages, setMessages] = useState([]);
    const [contentChat, setContentChat] = useState('');
    const [isScrolledUp, setIsScrolledUp] = useState(false);
    const messageContainerRef = useRef(null);

    const handleSendMessage = async () => {
        await AddMessage({
            "idSender": isAuthenticated ? userData.dataLogin.idUser : null,
            "idReceiver": parseInt(keyMessage.split('_')[1]),
            "content": contentChat,
            "isRead": false
        });
        setContentChat('');
        setIsScrolledUp(false);
    };

    useEffect(() => {
        const fetchDetailMessage = async () => {
            if (idUser) {
                const messages = await GetDetailMessage(idUser);
                setMessages(messages.conversations[`${keyMessage}`]);
            }
        };
        fetchDetailMessage();
    }, [keyMessage, idUser]);

    
    // Lắng nghe sự kiện 'newMessage' từ server
    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            const otherUserId = newMessage.idSender === idUser ? newMessage.idReceiver : newMessage.idSender;
            const conversationKey = [idUser, otherUserId].join('_');
            if (conversationKey === keyMessage) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socket.off('newMessage');
        };
    }, [keyMessage, idUser]);

    useEffect(() => {
        const handleScroll = () => {
            if (messageContainerRef.current) {
                const isAtBottom = messageContainerRef.current.scrollTop + messageContainerRef.current.clientHeight >= messageContainerRef.current.scrollHeight;
                setIsScrolledUp(!isAtBottom); // Cập nhật trạng thái nếu người dùng đang cuộn lên
            }
        };

        if (messageContainerRef.current) {
            messageContainerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (messageContainerRef.current) {
                messageContainerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        // Chỉ cuộn xuống nếu người dùng không đang cuộn lên
        if (!isScrolledUp && messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, show, isScrolledUp]);


    const closeModalDetailMessage = () => {
        close()
        setIsScrolledUp(false);
    }


    return (
        <div className={`detail_message px-2 ${show ? 'd-block' : 'd-none'}`}>
            <div style={{ borderBottom: '1px solid #cccc' }} className='d-flex align-items-center py-2 detail_message-header'>
                <div style={{ width: '70%' }} className='d-flex align-items-center '>
                    <img
                        width="45px"
                        className='rounded-2'
                        src="https://scontent.fhan4-3.fna.fbcdn.net/v/t1.6435-1/152256675_830708044179501_4412667266017141843_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=zHeKk027D0YQ7kNvgHO16_R&_nc_ht=scontent.fhan4-3.fna&oh=00_AYAaelseltUFmW7nMBb5Eb-dZR0SdkA34a9DQ2PUPLjFBA&oe=672367D6" alt=""
                    />
                    <h6 style={{ fontSize: '15px' }} className='fw-bold detail_message-text px-2'>Biệt đội bú liếm Rank</h6>
                    <i style={{ color: '#4992ee' }} class="bi bi-chevron-down"></i>
                </div>
                <div style={{ width: '30%' }} className='d-flex align-items-center justify-content-between'>
                    <i style={{ color: '#4992ee' }} class="bi bi-telephone-fill"></i>
                    <i style={{ color: '#4992ee' }} class="bi bi-camera-video"></i>
                    <i style={{ color: '#4992ee' }} class="bi bi-dash"></i>
                    <i onClick={() => closeModalDetailMessage()} style={{ color: '#4992ee', cursor: 'pointer' }} class="bi bi-x-lg"></i>
                </div>
            </div>

            <div ref={messageContainerRef} className='detail_message-content' style={{ width: '100%' }}>
                {messages && messages.map((message, index) => (
                    <div key={index}>
                        {message.idSender === idUser ? (
                            <div className='d-flex justify-content-start' style={{ backgroundColor: '#1877F2', maxWidth: '70%', marginBottom: '10px', borderRadius: '5px' }}>
                                <h6 className='text-white p-2'>{message.content}</h6>
                            </div>

                        ) : (
                            <div className='d-flex justify-content-end' style={{ marginLeft: '30%', maxWidth: '70%', marginBottom: '10px', borderRadius: '5px' }}>
                                <div style={{ backgroundColor: '#F2F3F5', width: '100%', borderRadius: '5px' }}>
                                    <h6 className='text-black p-2'>{message.content}</h6>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            </div>
            <div style={{ width: '100%' }} className='d-flex align-items-center justify-content-between detail_message-chat'>
                <i style={{ color: '#4992ee', fontSize: '22px' }} class="bi bi-plus-circle-fill me-2"></i>
                <i style={{ color: '#4992ee', fontSize: '22px' }} class="bi bi-file-earmark-image me-2"></i>
                <input
                    onChange={(e) => setContentChat(e.target.value)}
                    value={contentChat}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                    style={{ height: '45px' }} class="form-control mt-2" list="datalistOptions" id="exampleDataList" placeholder="Soạn tin nhắn..."
                />
                <i onClick={() => handleSendMessage()} style={{ color: '#4992ee', fontSize: '22px' }} class="bi bi-arrow-right-square-fill ms-2 send_message"></i>
            </div>
        </div>
    );
}
