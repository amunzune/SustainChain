module.exports = (sequelize, Sequelize) => {
  const SupplyChainNode = sequelize.define("supplyChainNode", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('source', 'processing', 'manufacturing', 'distribution', 'retail'),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: true
    },
    address: {
      type: Sequelize.STRING
    },
    contactPerson: {
      type: Sequelize.STRING
    },
    contactEmail: {
      type: Sequelize.STRING
    },
    contactPhone: {
      type: Sequelize.STRING
    },
    riskLevel: {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      defaultValue: 'low'
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return SupplyChainNode;
};
