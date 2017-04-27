'use strict'

const swaggerUi = require('swagger-ui-express')
const swagger = require('../docs')

module.exports = {

    /**
     * 設定 Swagger
     * 
     * @param {object} router 
     * @param {number} port 
     * @param {string} basePath 
     */
    setupSwagger: (router, port, basePath) => {

        let swaggerDefinition = {
            swagger: '2.0',
            info: {
                title: 'Swagger API Documents',
                version: '1.0.0',
                description: 'Describe RESTful APIs with Swagger',
            },
            host: 'localhost:' + port,
            basePath: basePath,
            securityDefinitions: {
                jwt: {
                    type: 'apiKey',
                    name: 'x-access-token',
                    in: 'header'
                }
            },
            security: [
                { jwt: [] }
            ],
            consumes: [
                'application/json'
            ],
            produces: [
                'application/json'
            ],
            paths: swagger
        }

        router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition))
    }
}