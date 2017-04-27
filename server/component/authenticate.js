'use strict'

let jwt = require('jsonwebtoken')
let config = require('../config/config')

module.exports = {
	auth: (req, res, next) => {

		let token = req.headers['x-access-token']

		jwt.verify(token, config.hash, (err, decoded) => {
			if (err) {
				res.status(401).send({
					'message': err.message
				})
			} else {
				req.tokenDecoded = decoded
				next()
			}
		})
	}
}