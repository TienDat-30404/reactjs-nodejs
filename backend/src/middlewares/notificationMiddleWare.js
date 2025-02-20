const validateNotificationMiddleWare = async (req, res, next) => {
    const { content } = req.body
    const errors = {}
    content === "" ? errors.content = 'Content is required' : null
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    next()
}
export {validateNotificationMiddleWare}