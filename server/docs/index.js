'use strict'

let fs = require('fs')
let path = require('path')
let basename = path.basename(module.filename)
let swagger = {}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach(file => {
        let doc = require(path.join(__dirname, file))
        swagger = Object.assign({}, swagger, doc)
    })

module.exports = swagger