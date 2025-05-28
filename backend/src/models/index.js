const { Sequelize } = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require('./user.model')(sequelize, Sequelize);
db.organization = require('./organization.model')(sequelize, Sequelize);
db.supplier = require('./supplier.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);
db.supplyChainNode = require('./supplyChainNode.model')(sequelize, Sequelize);
db.connection = require('./connection.model')(sequelize, Sequelize);
db.grievance = require('./grievance.model')(sequelize, Sequelize);
db.satelliteAlert = require('./satelliteAlert.model')(sequelize, Sequelize);
db.kpi = require('./kpi.model')(sequelize, Sequelize);
db.survey = require('./survey.model')(sequelize, Sequelize);
db.question = require('./question.model')(sequelize, Sequelize);
db.response = require('./response.model')(sequelize, Sequelize);

// Define relationships
db.organization.hasMany(db.user);
db.user.belongsTo(db.organization);

db.organization.hasMany(db.supplier);
db.supplier.belongsTo(db.organization);

db.supplier.hasMany(db.product);
db.product.belongsTo(db.supplier);

db.product.hasMany(db.supplyChainNode);
db.supplyChainNode.belongsTo(db.product);

db.supplyChainNode.hasMany(db.connection, { as: 'sourceConnections', foreignKey: 'sourceId' });
db.supplyChainNode.hasMany(db.connection, { as: 'targetConnections', foreignKey: 'targetId' });
db.connection.belongsTo(db.supplyChainNode, { as: 'source', foreignKey: 'sourceId' });
db.connection.belongsTo(db.supplyChainNode, { as: 'target', foreignKey: 'targetId' });

db.supplier.hasMany(db.grievance);
db.grievance.belongsTo(db.supplier);

db.organization.hasMany(db.kpi);
db.kpi.belongsTo(db.organization);

db.organization.hasMany(db.survey);
db.survey.belongsTo(db.organization);

db.survey.hasMany(db.question);
db.question.belongsTo(db.survey);

db.question.hasMany(db.response);
db.response.belongsTo(db.question);

db.supplier.hasMany(db.response);
db.response.belongsTo(db.supplier);

module.exports = db;
