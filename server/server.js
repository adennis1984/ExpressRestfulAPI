'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const models = require('./models')
const swagger = require('./component/swagger')
const authenticate = require('./component/authenticate')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000
const basePath = '/api/v1'

// set environment is localhost or production
process.env.environment = 'production'

//backend api http header security
app.use(helmet())

// parse json and application/x-www-form-urlencoded 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cors setting
app.use(cors({ credentials: true, origin: true }))

// parse cookie
app.use(cookieParser())

// Create our Express router
let router = express.Router()

// Swagger only works on localhost
if (process.env.NODE_ENV === 'localhost') {
	swagger.setupSwagger(router, port, basePath)
}

/** user api  **/
router.use(userRouter(authenticate))

// Register all our routes with /api/v1
app.use(basePath, router)

// Err handler
app.use((err, req, res) => {
	console.error(err.stack)
	res.status(500).send('Oops! Something broken!')
})

// Start the server
models.sequelize.sync().then(() => {
	app.listen(port)
	app.emit('appStarted')
	console.log('server is running at http://localhost:' + port + basePath)
})

module.exports = app
