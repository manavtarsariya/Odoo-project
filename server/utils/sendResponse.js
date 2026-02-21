/**
 * Standardize API responses
 * @param {Response} res Express response object
 * @param {number} statusCode HTTP status code
 * @param {boolean} success Success flag
 * @param {string} message Response message
 * @param {any} data Response data
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default sendResponse;
