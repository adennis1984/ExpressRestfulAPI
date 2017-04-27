'use strict'

let fs = require('fs')
let path = require('path')
var Sequelize = require('sequelize')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

var basename = path.basename(module.filename)
let env = process.env.NODE_DB_ENV || 'development'
let config = require(path.join(__dirname, '..', 'config', 'model-config.json'))[env]
config.logging = !process.env.NODE_ENV === 'test'

let sequelize = new Sequelize(config.dbname, config.username, config.password, config)
let db = {}

console.log('db env', env)

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db