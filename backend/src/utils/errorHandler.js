const errorHandler = (err, req, res, next) => {
    const statusCode = err.status  || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        statusCode : statusCode,
        message : message
    })
}
export default errorHandler