'use strict'

var bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    jwt = require('jsonwebtoken'),
    randomstring = require('randomstring'),
    config = require('../config/config')

module.exports = {

    /**
     * 隨機產生亂數密碼
     * @returns {string} random password
     */
    randomPassword: () => {
        //加密亂數
        return bcrypt.hashSync(randomstring.generate(3), salt)
    },

    /**
     * 產生令牌
     * @param {number} userID - 使用者代碼
     * @param {string} expiresIn - 到期時間 EX:60, '2 days', '10h', '7d'
     * @returns {string} token
     */
    genToken: (userID, expiresIn) => {
        const defaultTime = 60 * 60 * 24 * 7 * 2
        let newToken = jwt.sign({
            token: randomstring.generate(3),
            userID: userID
        },
            config.hash, {
                expiresIn: expiresIn ? defaultTime : expiresIn
            })

        return newToken
    },

    /**
     * 產生亂數大頭照
     * @returns {number} avatarID - 頭像代碼
     */
    randomAvatarID: () => {
        let avatarID = Math.floor(Math.random() * 10) + 1
        return avatarID
    }
}


