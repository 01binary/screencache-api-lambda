const express = require('express')
const postsStore = require('../stores/postsStore')
const posts = express.Router()

posts.get('/', async(req, res) => (
    postsStore.getPostsByUser({
        userId: req.userId
    })
    .then(posts => res.send({
        posts
    }))
))

posts.get('/:postId', async(req, res) => (
    postsStore.getPost({
        postId: req.params.postId
    })
    .then(post => res.send(post))
))

posts.put('/:postId', async(req, res) => {})

posts.delete('/:postId', async(req, res) => {})

module.exports = posts
