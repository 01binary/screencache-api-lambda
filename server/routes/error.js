const errors = require('../lib/errors')

const getError = ({ code }) => errors[code] || errors.SERVER_ERROR

module.exports = (err, req, res, next) => {
    const {
        status,
        error,
        error_description
    } = getError(err)

    res
        .status(status)
        .send({ error, error_description })
}
