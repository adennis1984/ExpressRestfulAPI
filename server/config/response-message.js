'use strict'

const responseMessage = {

    NOT_FOUND: { status: 404, message: 's_sysMsg_0' },
    ERROR_HAPPENED: { status: 404, message: 's_sysMsg_1' },
    EMAIL_OR_PASSWORK_IS_NOT_CORRECT: { status: 404, message: 's_sysMsg_2' },

    USER_NOT_FOUND: { status: 404, message: 's_user_0' },
    USER_NOT_JOIN_ROOM: { status: 404, message: 's_user_1' },
    USER_EMAIL_EXISTED: { status: 403, message: 's_user_2' },
    USER_PERMISSION_DENIED: { status: 403, message: 's_user_3' },
    USER_CREATE_SUCCESS: 's_user_4',
    USER_CREATE_FAIL: { status: 400, message: 's_user_5' },
    USER_UPDATE_SUCCESS: 's_user_6',
    USER_UPDATE_FAIL: { status: 400, message: 's_user_7' },
    USER_DELETE_SUCCESS: 's_user_8',
    USER_DELETE_FAIL: { status: 400, message: 's_user_9' },
    USER_LOGIN_SUCCESS: 's_user_10',
    USER_LOGIN_FAIL: { status: 400, message: 's_user_11' },
    USER_LOGOUT_SUCCESS: 's_user_12',
    USER_LOGOUT_FAIL: { status: 400, message: 's_user_13' },
    USER_RESET_PASSWORD_SUCCESS: 's_user_14',
    USER_RESET_PASSWORD_FAIL: { status: 400, message: 's_user_15' },
    USER_SEND_MAIL_SUCCESS: 's_user_16',
    USER_SEND_MAIL_FAIL: { status: 400, message: 's_user_17' }
}

module.exports = responseMessage
