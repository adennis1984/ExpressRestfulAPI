'use strict'

let chai = require('chai')
let chaiHttp = require('chai-http')
let baseApiUtils = require('../../../controllers/utils/base-api-utils')

chai.use(chaiHttp)
let expect = chai.expect

describe('base-api-utils', () => {
    describe('isUserExists()', () => {
        it('should return two property: exists and results', (done) => {
            baseApiUtils.isUserExists(1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IkRCMiIsInVzZXJJRCI6MSwiaWF0IjoxNDkwMjAxMjY5fQ.ioLohT3dg4rNJITu3FjiFAO5V8vg3IjnLTAs5P7Scb8')
                .then(success => {
                    try {
                        expect(success).to.have.property('exists')
                        expect(success).to.have.property('results')
                        done()
                    } catch (error) {
                        done(error)
                    }
                }).catch(failure => {
                    done(failure)
                })
        })
    })
    describe('check_User_Join()', () => {
        it('should return two property: isJoin and results', (done) => {
            baseApiUtils.check_User_Join({
                userID: 1,
                roomID: 1
            }).then(success => {
                try {
                    expect(success).to.have.property('isJoin')
                    expect(success).to.have.property('results')
                    done()
                } catch (error) {
                    done(error)
                }
            }).catch(failure => {
                done(failure)
            })
        })
    })
    describe('check_Message_Owner()', () => {
        it('should return a boolean', (done) => {
            baseApiUtils.check_Message_Owner({
                roomID: 1,
                channelID: 1,
                messageID: 1
            }).then(success => {
                try {
                    expect(success).to.have.property('isOwner')
                    expect(success.isOwner).to.be.a('boolean')
                    done()
                } catch (error) {
                    done(error)
                }
            }).catch(failure => {
                done(failure)
            })
        })
    })
    describe('hashPassword()', () => {
        it('should return a hashed password', (done) => {
            try {
                expect(baseApiUtils.hashPassword('1')).to.be.a('string')
                done()
            } catch (error) {
                done(error)
            }
        })
    })
    describe('comparePassword()', () => {
        it('should return a boolean', (done) => {
            try {
                expect(baseApiUtils.comparePassword('1', '$2a$10$/QsnhuuwXBp6ix4orrSnTewFoSoG2urUudrrMahg4O7vlRM3084r.')).to.be.a('boolean')
                done()
            } catch (error) {
                done(error)
            }
        })
    })
})