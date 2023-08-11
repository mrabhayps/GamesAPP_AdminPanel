const Sequelize = require('sequelize');
const sequelize = require('./database');
const gmsGames = sequelize.define('gmsGames', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.DataTypes.STRING,
    title: Sequelize.DataTypes.STRING,
    description: Sequelize.DataTypes.STRING,
    smallIconImage: Sequelize.DataTypes.STRING,
    longIconImage: Sequelize.DataTypes.STRING,
    bgImage: Sequelize.DataTypes.STRING,
    topColorCode: Sequelize.DataTypes.STRING,
    bottomColorCode: Sequelize.DataTypes.STRING,
    isBattle: Sequelize.DataTypes.TINYINT,
    isTurnament: Sequelize.DataTypes.TINYINT,
    isMatchup: Sequelize.DataTypes.TINYINT,
    tokenPrize: Sequelize.DataTypes.INTEGER,
    howToPlay: Sequelize.DataTypes.STRING,
    appLaunchLink: Sequelize.DataTypes.STRING,
    configFile: Sequelize.DataTypes.STRING,
    orientation: Sequelize.DataTypes.TINYINT,
    screenmode: Sequelize.DataTypes.TINYINT,
    version: Sequelize.DataTypes.STRING,
    downloadLink: Sequelize.DataTypes.STRING,
    createdAt: Sequelize.DataTypes.DATE,
    createdBy: Sequelize.DataTypes.STRING,
    updatedAt: Sequelize.DataTypes.DATE,
    updatedBy: Sequelize.DataTypes.STRING,
    status: Sequelize.DataTypes.TINYINT,
    popularRank: Sequelize.DataTypes.INTEGER,
    gameCategory: Sequelize.DataTypes.INTEGER,
    gameType: Sequelize.DataTypes.INTEGER,
    gameEndTime: Sequelize.DataTypes.INTEGER
},
    {
        tableName: 'gmsGames'
    }
)

module.exports = gmsGames;
