const Message = require('../model/MessageModel');

const addMessage = async (req, res, next) => {
    try {
        const { idSender, idReceiver, content, isRead } = req.body;
        const newMessage = new Message({ idSender, idReceiver, content, isRead });
        await newMessage.save();

        // Phát sự kiện 'newMessage' tới tất cả các client
        const io = req.app.get('io');
        io.emit('newMessage', newMessage);

        return res.status(200).json({ newMessage });
    } catch (error) {
        next(error);
    }
};

const GetDetailMessage = async (req, res, next) => {
    try {
        const { idUser } = req.query;
        const messages = await Message.find({
            $or: [
                { idSender: idUser },
                { idReceiver: idUser }
            ]
        }).sort({ createdAt: 1 });

        const conversations = {};

        messages.forEach(message => {
            const otherUserId = message.idSender == idUser ? message.idReceiver : message.idSender;
            const conversationKey = [idUser, otherUserId].join('_');
            if (!conversations[conversationKey]) {
                conversations[conversationKey] = [];
            }
            conversations[conversationKey].push(message);
        });

        return res.status(200).json({ conversations });
    } catch (error) {
        next(error);
    }
};

module.exports = { addMessage, GetDetailMessage };
