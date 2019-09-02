const express = require('express')
const moment = require('moment')
const constants = require('../lib/constants')
const postsStore = require('../stores/postsStore')
const router = express.Router()

router.get('/', async(req, res) => (
    postsStore.getPostsByDate({
        fromMoment: moment().subtract(1, 'day'),
        toMoment: moment()
    })
    .then(posts => res.send({
        posts
    }))
))

router.get('/:userId', async(req, res) => (
    postsStore.getPostsByUser({
        userId: req.params.userId
    })
    .then(posts => res.send({
        posts
    }))
))

router.get('/:userId/:timeStamp(\\d+)', async (req, res) => (
    postsStore
        .getPost({
            userId: req.params.userId,
            timeStamp: parseInt(req.params.timeStamp, 10)
        })
        .then(post => res.send(post))
))

router.use((req, res, err) => {
    console.log(err)
    res.status(500).send()
})

module.exports = router
