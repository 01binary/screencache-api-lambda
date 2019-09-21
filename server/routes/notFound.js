module.exports = (req, res) => {
    res.status(404)
    res.send({
        error: 'not_found',
        error_description: 'No endpoint matches this path'
    })
}
