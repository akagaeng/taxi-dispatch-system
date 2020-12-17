const {Sequelize} = require('sequelize');
const db = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/tds.db',
  database: 'main'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
