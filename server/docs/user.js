'use strict'

let userController = require('../controllers/userController')

module.exports = {

    '/users/login': {
        post: {
            tags: ['Users'],
            summary: '使用者登入',
            description: '',
            operationId: userController.login.toString(),
            parameters: [
                {
                    name: 'body',
                    description: '',
                    in: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string' },
                            password: { type: 'password' }
                        },
                        example: {
                            'email': 'someUser@onework.io',
                            'password': 'somePassword'
                        }
                    }
                }
            ],
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            status: 'ok',
                            results: {
                                'accessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6Ing2dCIsInVzZXJJRCI6MiwiaWF0IjoxNDg5MDgxNTI4fQ.WJ25RHe23F4r02R9BM1_fmzM05NcRoWvw__pDQL9UKs',
                                'userID': 2
                            }
                        }
                    }
                }
            }
        }
    },
    '/users/logout': {
        post: {
            tags: ['Users'],
            summary: '使用者登出',
            description: '',
            operationId: userController.logout.toString(),
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            'status': 'ok',
                            'results': 's_user_12'
                        }
                    }
                }
            }
        },
    },
    '/users': {
        get: {
            tags: ['Users'],
            summary: '取得使用者資訊',
            description: '',
            operationId: userController.getUser.toString(),
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            'status': 'ok',
                            'results': {
                                'ID': 1,
                                'userName': '小紅',
                                'organisation': '測試公司',
                                'email': 'dennischo@onework.io',
                                'avatar': 5
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Users'],
            summary: '建立使用者',
            description: '',
            operationId: userController.createUser.toString(),
            parameters: [
                {
                    name: 'body',
                    description: '',
                    in: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string' },
                            password: { type: 'password' }
                        },
                        example: {
                            'email': 'someUser@onework.io',
                            'password': 'somePassword'
                        }
                    }
                }
            ],
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            status: 'ok',
                            results: {
                                'message': 's_user_4',
                                'accessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6Ing2dCIsInVzZXJJRCI6MiwiaWF0IjoxNDg5MDgxNTI4fQ.WJ25RHe23F4r02R9BM1_fmzM05NcRoWvw__pDQL9UKs',
                                'userID': 2
                            }
                        }
                    }
                }
            }
        }
    },
    '/users/{userID}': {
        put: {
            tags: ['Users'],
            summary: '更新使用者',
            description: '',
            operationId: userController.updateUser.toString(),
            parameters: [
                {
                    name: 'userID',
                    description: '使用者代碼',
                    in: 'path',
                    required: true,
                    type: 'string'
                },
                {
                    name: 'body',
                    description: '',
                    in: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['userName', 'organisation', 'avatar'],
                        properties: {
                            userName: { type: 'string' },
                            organisation: { type: 'string' },
                            avatar: { type: 'string' }
                        },
                        example: {
                            'userName': '毛怪',
                            'organisation': '怪獸電力公司',
                            'avatar': 5
                        }
                    }
                }
            ],
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            'status': 'ok',
                            'results': 's_user_6'
                        }
                    }
                },
                '400': {
                    'description': 's_user_7'
                }
            }
        }
    },
    '/users/{userID}/{roomID}': {
        delete: {
            tags: ['Users'],
            summary: '刪除使用者',
            description: 'roomID 有值表示僅從特定聊天室刪除該使用者',
            operationId: userController.deleteUser.toString(),
            parameters: [
                {
                    name: 'userID',
                    description: '使用者代碼',
                    in: 'path',
                    required: true,
                    type: 'integer'
                },
                {
                    name: 'roomID',
                    description: '聊天室代碼',
                    in: 'path',
                    required: true,
                    type: 'integer',
                    default: 0
                }
            ],
            responses: {
                '200': {
                    schema: { type: 'object' },
                    examples: {
                        'application/json': {
                            'status': 'ok',
                            'results': 's_user_8'
                        }
                    }
                },
                '400': {
                    'description': 's_user_9'
                }
            }
        }
    }
}