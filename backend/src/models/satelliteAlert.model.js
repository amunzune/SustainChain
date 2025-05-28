module.exports = (sequelize, Sequelize) => {
  const SatelliteAlert = sequelize.define("satelliteAlert", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    alertDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    coordinates: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('deforestation', 'fire', 'landcover_change', 'other'),
      allowNull: false
    },
    severity: {
      type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium'
    },
    area: {
      type: Sequelize.FLOAT,
      comment: 'Area affected in hectares'
    },
    confidence: {
      type: Sequelize.FLOAT,
      validate: {
        min: 0.0,
        max: 1.0
      },
      defaultValue: 0.8
    },
    source: {
      type: Sequelize.STRING,
      defaultValue: 'sentinel'
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('new', 'investigating', 'confirmed', 'false_positive'),
      defaultValue: 'new'
    },
    notes: {
      type: Sequelize.TEXT
    }
  });

  return SatelliteAlert;
};
