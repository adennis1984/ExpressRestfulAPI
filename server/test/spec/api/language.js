'use strict'

let chai = require('chai')
let chaiHttp = require('chai-http')
let url = require('../../../../infrastructure/utils/base-url').base_api_url.localhost

chai.use(chaiHttp)

let request = chai.request(url)
let expect = chai.expect

describe('languageController', () => {

    describe('getLanguage()', () => {

        it('should get language api response of default language', (done) => {
            request
                .get('/language')
                .then((res) => {
                    try {
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.status('ok')
                        expect(res.body.results).to.have.property('c_admin_0')
                        expect(res.body.results['c_admin_0']).to.equal('Personal Management')
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })

        it('should get language api response of custom language', (done) => {
            request
                .get('/language/zh-tw')
                .then((res) => {
                    try {
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.status('ok')
                        expect(res.body.results).to.have.property('c_admin_0')
                        expect(res.body.results['c_admin_0']).to.equal('個人管理')
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })
    })
})