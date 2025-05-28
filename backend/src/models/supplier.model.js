module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define("supplier", {
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
      type: Sequelize.ENUM('producer', 'processor', 'manufacturer', 'distributor'),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    region: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: true
    },
    contactPerson: {
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
    certifications: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    riskScore: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0,
      validate: {
        min: 0.0,
        max: 1.0
      }
    },
    hasSustainabilityPlan: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Supplier;
};
