export const globalErrHandler = (err, req, res, next) => {

    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const stack = err?.stack;
    const message = err?.message;

    res.status(statusCode).json({ stack, message });
};


//404 handler
export const notFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
};