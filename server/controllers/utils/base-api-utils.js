'use strict'

let fs = require('fs')
let models = require('../../models')
let Promise = require('es6-promise').Promise
let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10)
let logger = require('../../component/logger')

module.exports = {
    /**
     * api回應結果方法
     * 
     * @params {object} transaction - 交易機制
     * @params {object} res - api回應
     * @params {object} err - 錯誤回應
     * @params {object} results - 回傳結果  
     */
    responseHandler: (transaction, res, err, results) => {
        if (transaction) {
            err ? transaction.rollback() : transaction.commit()
        }

        if (err) {
            logger.error(err) //新增錯誤紀錄
            res.status(200).send({ status: err.status || 400, message: err.message })
        } else {
            res.status(200).send({ status: 'ok', results: results })
        }
    },
    /**
     * 確認使用者是否存在方法
     * 
     * @params {number} userID - 使用者代碼
     * @params {string} token - 通行令牌
     * 
     * @returns {object} promise
     */
    isUserExists: userID => {

        return new Promise((resolve, reject) => {
            models.user.findAll({
                where: { ID: userID, isDelete: false },
                attributes: { exclude: ['password', 'isDelete', 'deleteUserID', 'createdAt', 'updatedAt'] },
                raw: true
            }).then(result => {
                resolve({
                    exists: result.length > 0 ? true : false,
                    results: result[0]
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 確認使用者是否有加入聊天室方法,並回傳所有參與聊天室資料
     *  
     * @typedef {Object} userConditions
     * @property {number} userID - 使用者代碼
     * @property {number} roomID - 聊天室代碼
     * 
     * @param {userConditions} conditions - 上傳檔案資訊 
     * 
     * @returns {object} promise 
     */
    check_User_Join: conditions => {
        let promise = new Promise((resolve, reject) => {
            models.userRoomMapping.findAll({
                where: conditions,
                raw: true
            }).then(results => {
                resolve({
                    isJoin: results.length > 0 ? true : false,
                    results: results
                })
            }).catch(err => {
                reject(err)
            })
        })

        return promise
    },

    /**
     * 加密密碼
     * @returns {string}  hash password
     */
    hashPassword: password => {
        return bcrypt.hashSync(password, salt)
    },

    /**
    * 驗證密碼
    * @returns {boolean} true or false
    */
    comparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}