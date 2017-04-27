'use strict'

let app = require('../../../server')

before((done) => {
    app.on('appStarted', () => {
        done()
    })
})