'use strict'

module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define('user', {
        ID: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            comment: '使用者代碼'
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '使用者名稱'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            comment: '使用者帳號'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '使用者密碼'
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '登入令牌'
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否被刪除'
        },
        deleteUserID: {
            type: DataTypes.UUID,
            allowNull: true,
            comment: '刪除人員'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '建立時間'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '更新時間'
        }
    }, {
            tableName: 'User',
            freezeTableName: true,
            comment: '使用者主檔',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            classMethods: {
                associate: models => {
                    user.hasMany(models.loginHistory, { foreignKey: 'userID', onDelete: 'CASCADE' })
                    user.belongsTo(models.user, { as: 'deleteUser', foreignKey: 'deleteUserID', onDelete: 'CASCADE' })
                }
            }
        })

    return user
}