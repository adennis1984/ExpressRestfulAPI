'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

module.exports = (authenticate) => {

    router.post('/users', userController.createUser)
    router.post('/users/login', userController.login)

    router.use(authenticate.auth)

    router.post('/users/logout', userController.logout)
    router.get('/users', userController.getUser)
    router.put('/users/:userID', userController.updateUser)
    router.delete('/users/:userID/:roomID?', userController.deleteUser)

    return router
}