
// const Sequelize = require('sequelize');
// const sequelize = require('./database');
// const gmsUsers = sequelize.define('gmsUsers', {
//     id: {
//         type: Sequelize.DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     firstName: Sequelize.DataTypes.STRING,
//     middleName: Sequelize.DataTypes.STRING,
//     lastName: Sequelize.DataTypes.STRING,
//     email: Sequelize.DataTypes.STRING,
//     mobile: Sequelize.DataTypes.BIGINT,
//     dob: Sequelize.DataTypes.DATE,
//     gender: Sequelize.DataTypes.STRING,
//     image: Sequelize.DataTypes.STRING,
//     defaultImage: Sequelize.DataTypes.STRING,
//     city: Sequelize.DataTypes.STRING,
//     state: Sequelize.DataTypes.STRING,
//     country: Sequelize.DataTypes.STRING,
//     continent: Sequelize.DataTypes.STRING,
//     createdAt: Sequelize.DataTypes.DATE,
//     updatedAt: Sequelize.DataTypes.DATE,
//     updatedBy: Sequelize.DataTypes.STRING,
//     winPrize: Sequelize.DataTypes.INTEGER,
//     winPrizeT: Sequelize.DataTypes.INTEGER,
//     rank: Sequelize.DataTypes.INTEGER,
//     rankT: Sequelize.DataTypes.INTEGER,
//     status: Sequelize.DataTypes.TINYINT,
//     latitude: Sequelize.DataTypes.STRING,
//     lontitude: Sequelize.DataTypes.STRING,
//     canUpdateUserName: Sequelize.DataTypes.TINYINT,
//     totalWins: Sequelize.DataTypes.INTEGER,
//     totalWinningAmount: Sequelize.DataTypes.INTEGER,
//     gameMatrix: Sequelize.DataTypes.STRING,
//     userName: Sequelize.DataTypes.STRING,
//     facebookId: Sequelize.DataTypes.STRING,
//     referralCode: Sequelize.DataTypes.STRING,
//     lastSeen: Sequelize.DataTypes.DATE,
//     restoreId: Sequelize.DataTypes.STRING,
//     isCreatorStatus: Sequelize.DataTypes.INTEGER,
//     kycStatus: Sequelize.DataTypes.INTEGER,
//     kycResponse: Sequelize.DataTypes.STRING,
//     reportedCount: Sequelize.DataTypes.INTEGER,
// }, {
//     tableName: 'gmsUsers', // Specify the exact table name
// });
// module.exports = gmsUsers;