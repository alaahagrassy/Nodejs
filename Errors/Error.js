module.exports = ({ statusCode , code, message }) => {
    const customError = new Error(message);
    customError.code = code;
    customError.status = statusCode;
    return customError;
}