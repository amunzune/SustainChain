module.exports = (sequelize, Sequelize) => {
  const Organization = sequelize.define("organization", {
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
      type: Sequelize.ENUM('brand', 'supplier', 'ngo', 'government'),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contactEmail: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    contactPhone: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Organization;
};
