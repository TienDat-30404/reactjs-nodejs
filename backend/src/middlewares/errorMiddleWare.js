const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: err
    });
};

// module.exports = errorMiddleware;
export default errorMiddleware