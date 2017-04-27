'use strict'

let winston = require('winston')
let moment = require('moment')
let path = require('path')
let fs = require('fs')

const _logPath = path.resolve(__dirname, '../logs')

//格式化日期
const logPathDate = moment().format('YYYY-MM-DD')
const _logDate = () => { return moment().format('YYYY-MM-DD HH:mm:ss:SSS') }

//確認log資料夾是否存在,不存在則新增
let _logDir = _logPath + '/' + logPathDate
fs.access(_logDir, err => err ? fs.mkdirSync(_logDir) : null)

//所有log紀錄
const _info = new winston.transports.File({
    name: 'infoLogs',
    filename: _logDir + '/info.log',
    timestamp: _logDate,
    maxFiles: 10,
    maxsize: 100000000,
    level: 'info',
    levelOnly: true,
    colorize: true,
    json: false
})

//所有log紀錄
const _allLogs = new winston.transports.File({
    name: 'allLogs',
    filename: _logDir + '/all.log',
    timestamp: _logDate,
    maxFiles: 10,
    maxsize: 100000000,
    level: 'info',
    colorize: true,
    json: false
})

//所有錯誤log紀錄,會自動catch carsh log
const _errorLogs = new winston.transports.File({
    name: 'errorLogs',
    filename: _logDir + '/error.log',
    timestamp: _logDate,
    maxFiles: 10,
    maxsize: 100000000,
    level: 'error',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true,
    exitOnError: false,
    json: false
})

//產生log物件
const _logger = new (winston.Logger)({
    transports: [
        _info,
        _errorLogs
    ]
})

module.exports = exports = _logger 