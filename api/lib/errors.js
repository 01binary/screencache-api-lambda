module.exports = {
    SERVER_ERROR: {
        status: 500,
        error: 'server_error',
        error_description: 'The server was unable to process this request'
    },
    EBADCSRFTOKEN: {
        status: 400,
        error: 'invalid_request',
        error_description: "The header 'CSRF-Token' is missing or invalid"
    }
}
