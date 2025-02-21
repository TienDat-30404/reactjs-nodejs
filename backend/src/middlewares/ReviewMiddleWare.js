 const replyReviewMiddleware = async(req, res, next) => {
    const {reply} = req.body
    const error = {}
    reply === '' && (error.reply = 'Phản hồi không được để trống')
    return Object.keys(error).length > 0 ? res.status(400).json({ error }) : next()
}
export {replyReviewMiddleware}