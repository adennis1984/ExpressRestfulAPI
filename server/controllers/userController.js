'use strict'

let generate = require('../component/generate')
let async = require('async')
let uuid = require('node-uuid')
let models = require('../models')
let baseApiUtils = require('../controllers/utils/base-api-utils')
let responseMessage = require('../config/response-message')

module.exports = {

    /**
     * 取得使用者資訊 API
     */
    getUser: (req, res) => {

        let userID = req.tokenDecoded.userID

        asyncFunc()

        async function asyncFunc() {
            try {
                let result = await baseApiUtils.isUserExists(userID)
                let resultVO = result.exists ? _setVO(result.results) : responseMessage.USER_NOT_FOUND
                baseApiUtils.responseHandler(null, res, null, resultVO)
            } catch (err) {
                let newErr = err.status ? err : responseMessage.USER_NOT_FOUND
                baseApiUtils.responseHandler(null, res, newErr)
            }
        }

        function _setVO(PO) {
            return {
                ID: PO.ID,
                userName: PO.userName,
                organisation: PO.organisation,
                email: PO.email,
                avatar: PO.avatar
            }
        }
    },
    /**
     * 建立使用者 API
     */
    createUser: (req, res) => {
        let email = req.body.email
        let password = req.body.password

        asyncFunc()

        async function asyncFunc() {
            try {
                let userID = uuid.v1()
                let t = await models.sequelize.transaction()
                let userVO = await models.user.findOrCreate({
                    where: { email: email },
                    defaults: {
                        ID: userID,
                        userName: email.substring(0, email.lastIndexOf('@')),
                        email: email,
                        password: baseApiUtils.hashPassword(password),
                        accessToken: generate.genToken(userID)
                    },
                    transaction: t
                })

                if (userVO[1] === false) { throw responseMessage.USER_EMAIL_EXISTED }

                let resultVO = {
                    message: responseMessage.USER_CREATE_SUCCESS,
                    accessToken: userVO[0].accessToken,
                    userID: userID
                }
                baseApiUtils.responseHandler(t, res, null, resultVO)
            } catch (err) {
                let newErr = err.status ? err : responseMessage.USER_CREATE_FAIL
                baseApiUtils.responseHandler(null, res, newErr)
            }
        }
    },
    /**
     * 更新使用者 API
     */
    updateUser: (req, res) => {
        let userID = req.params.userID
        let token = req.headers['x-access-token']
        let userName = req.body.userName
        let organisation = req.body.organisation
        let avatar = req.body.avatar

        async.waterfall([
            callback => {
                //先確認是否為本人修改資料
                baseApiUtils.isUserExists(userID, token).then((result) => {
                    !result.exists && callback(responseMessage.USER_PERMISSION_DENIED)
                })
                models.user.update({
                    userName: userName,
                    organisation: organisation,
                    avatar: avatar
                }, {
                        where: { ID: userID, isDelete: false }
                    }).then(result => {
                        console.log(result)
                        result ? callback(null, responseMessage.USER_UPDATE_SUCCESS) : callback(responseMessage.USER_UPDATE_FAIL)
                    }).catch(() => {
                        callback(responseMessage.USER_UPDATE_FAIL)
                    })
            }
        ], (err, results) => {
            baseApiUtils.responseHandler(null, res, err, results)
        })
    },
    /**
     * 刪除使用者 API
     */
    deleteUser: (req, res) => {
        let userID = req.params.userID
        let roomID = parseInt(req.params.roomID) || 0
        let token = req.headers['x-access-token']

        let condition = {
            user: { ID: userID },
            roomMapping: { userID: userID },
            roomMessage: { sendUser: userID },
            share: { createUserID: userID },
            accessToken: { userID: userID }
        }

        if (roomID) {
            condition.roomMapping.roomID = roomID
            condition.roomMessage.roomID = roomID
            condition.share.roomID = roomID
        }

        //start transaction
        models.sequelize.transaction().then(t => {
            async.waterfall([
                callback => {//確認是否為使用者本人
                    baseApiUtils.isUserExists(userID, token).then((result) => {
                        result.exists ? callback(null, userID) : callback(responseMessage.USER_PERMISSION_DENIED)
                    })
                },
                (userID, callback) => { //註記使用者已被移除
                    models.user.update({
                        isDelete: true,
                        deleteUserID: userID
                    }, {
                            where: condition.user,
                            transaction: t
                        }).then(() => {
                            callback(null, userID)
                        })
                },
                (userID, callback) => { //註記使用者對應聊天室關聯檔已被移除
                    models.userRoomMapping.update({
                        isDelete: true,
                        deleteUserID: userID
                    }, {
                            where: condition.roomMapping,
                            transaction: t
                        }).then(() => {
                            callback(null, userID)
                        })
                },
                (userID, callback) => { //註記使用者聊天室訊息已被移除
                    models.chatMessage.update({
                        isDelete: true,
                        deleteUserID: userID
                    }, {
                            where: condition.roomMessage,
                            transaction: t
                        }).then(() => {
                            callback(null, userID)
                        })
                },
                (userID, callback) => { //註記使用者上傳檔案已被移除

                    models.share.update({
                        isDelete: true,
                        deleteUserID: userID
                    }, {
                            where: condition.share,
                            transaction: t
                        }).then(() => {
                            callback(null, userID)
                        })
                },
                (userID, callback) => { //移除使用者登入令牌
                    models.accessToken.destroy({
                        where: condition.accessToken,
                        transaction: t
                    }).then(() => {
                        callback(null, responseMessage.USER_DELETE_SUCCESS)
                    }).catch(() => {
                        callback(responseMessage.USER_DELETE_FAIL)
                    })
                }
            ], (err, results) => {
                baseApiUtils.responseHandler(t, res, err, results)
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 使用者登入 API
     */
    login: (req, res) => {
        let email = req.body.email
        let password = req.body.password
        async.waterfall([
            callback => {
                models.user.findOne({ //check email
                    where: { email: email }
                }).then((userResult) => {
                    userResult ? callback(null, userResult) : callback(responseMessage.USER_NOT_FOUND)
                })
            },
            (userResult, callback) => { //check password
                var checkpassword = baseApiUtils.comparePassword(password, userResult.password)
                checkpassword ? callback(null, userResult.ID) : callback(responseMessage.EMAIL_OR_PASSWORK_IS_NOT_CORRECT)
            },
            (userID, callback) => { //create new accessToken
                models.accessToken.create({
                    token: generate.genToken(userID),
                    userID: userID
                }).then(result => {
                    callback(null, {
                        accessToken: result.token,
                        userID: userID
                    })
                })
            }
        ], (err, results) => {
            baseApiUtils.responseHandler(null, res, err, results)
        })
    },
    /**
     * 使用者登出 API
     */
    logout: (req, res) => {
        let token = req.headers['x-access-token']
        models.accessToken.destroy({
            where: { token: token }
        }).then(() => {
            baseApiUtils.responseHandler(null, res, null, responseMessage.USER_LOGOUT_SUCCESS)
        }).catch(() => {
            baseApiUtils.responseHandler(null, res, responseMessage.USER_LOGOUT_FAIL)
        })
    }
}