
const Sequelize = require('sequelize');
const sequelize = require('./database');
const gmsPaymentTransactionLogWithdraw = sequelize.define('gmsPaymentTransactionLogWithdraw', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fkSenderId: Sequelize.INTEGER,
    senderAcNum: Sequelize.INTEGER,
    fkReceiverId: Sequelize.INTEGER,
    receiverAcNum: Sequelize.INTEGER,
    amount: Sequelize.DOUBLE,
    senderClosingBalance: Sequelize.DOUBLE,
    receiverClosingBalance: Sequelize.DOUBLE,
    requestType: Sequelize.MEDIUMINT,
    payStatus: Sequelize.SMALLINT,
    createdAt: Sequelize.DATE,
    upDatedAt: Sequelize.DATE,
    pg: Sequelize.INTEGER,
    pgRefNo: Sequelize.STRING,
    battleRoomId: Sequelize.INTEGER,
    bankRefNo: Sequelize.STRING,
    customerRefNum: Sequelize.STRING,
    iblRefNo: Sequelize.STRING,
    apiMsg: Sequelize.STRING,
    description: Sequelize.STRING,
    fkGameId: Sequelize.INTEGER,
    gameEngine: Sequelize.SMALLINT,
    engineId: Sequelize.SMALLINT,
    duplicate: Sequelize.TINYINT,
    utrNo: Sequelize.TINYINT,
}, {
    tableName: 'gmsPaymentTransactionLogWithdraw'
});
module.exports = gmsPaymentTransactionLogWithdraw;