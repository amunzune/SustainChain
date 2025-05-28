module.exports = (sequelize, Sequelize) => {
  const Connection = sequelize.define("connection", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    sourceId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'supplyChainNodes',
        key: 'id'
      }
    },
    targetId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'supplyChainNodes',
        key: 'id'
      }
    },
    type: {
      type: Sequelize.ENUM('direct', 'indirect', 'potential'),
      defaultValue: 'direct'
    },
    transportMethod: {
      type: Sequelize.STRING
    },
    distance: {
      type: Sequelize.FLOAT
    },
    carbonFootprint: {
      type: Sequelize.FLOAT
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    verificationDate: {
      type: Sequelize.DATE
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Connection;
};
