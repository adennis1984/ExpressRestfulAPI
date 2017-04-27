'use strict'

module.exports = (sequelize, DataTypes) => {
    let loginHistory = sequelize.define('loginHistory', {
        ID: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            comment: '使用者登入紀錄檔代碼'
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '使用者代碼'
        },
        loginTime: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '登入時間'
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
            tableName: 'LoginHistory',
            freezeTableName: true,
            comment: '使用者登入紀錄檔',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            classMethods: {
                associate: models => {
                    loginHistory.belongsTo(models.user, { foreignKey: 'userID', onDelete: 'CASCADE' })
                }
            }
        })

    return loginHistory
}